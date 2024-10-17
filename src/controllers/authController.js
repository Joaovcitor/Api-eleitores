const User = require("../db/models/User");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

module.exports = class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).json({
          errors: "Usuário não encontrado, verifique suas informações!"
        });
      }

      const passwordMatch = bcryptjs.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ errors: "Senha incorreta!" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT, {
        expiresIn: "8h"
      });

      res.cookie("token", token, {
        httOnly: true,
        secure: true,
        sameSite: "Strict"
      });

      req.session.userId = user.id;
      req.session.save(() => {
        return res.status(200).json({
          token,
          user: { name: user.name, id: user.id, email: user.email }
        });
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao fazer login" });
    }
  }

  static async logout(req, res) {
    req.session.destroy();
    res.clearCookie("token", {
      httOnly: true,
      secure: true,
      sameSite: "Strict"
    });
    res.status(200).json({ success: "Logout feito com sucesso" });
  }
};
