const Users = require("../db/models/User");
const bcryptjs = require("bcryptjs");

module.exports = class UserController {
  static async store(req, res) {
    const { name, password, email } = req.body;

    try {
      const user = await Users.findOne({ where: { email: email } });
      if (user) {
        return res
          .status(400)
          .json({ errors: "Usuário já cadastrado com esse e-mail" });
      }
      const salt = bcryptjs.genSaltSync(10);
      const hashPassword = bcryptjs.hashSync(password, salt);

      const userCreate = {
        name: name,
        password: hashPassword,
        email: email
      };

      await Users.create(userCreate);

      req.session.userId = userCreate.id;

      res.status(200).json({ success: "Usuário criado com sucesso!" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao criar o usuário" });
    }
  }

  static async updateEmail(req, res) {
    const { email } = req.body;
    const idSessionUser = req.session.userId;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ errors: "Digite um e-mail valido" });
    }

    try {
      await Users.update({ email }, { where: { id: idSessionUser } });

      res.status(200).json({ success: "E-mail editado com sucesso" });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao atualizar seu e-mail"
      });
    }
  }

  static async updatePassword(req, res) {
    const { password, confirmPassword } = req.body;
    const idSessionUser = req.session.userId;

    if (password !== confirmPassword) {
      return res.status(400).json({ errors: "Senhas não iguais" });
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);

    try {
      await Users.update({ hashPassword }, { where: { id: idSessionUser } });

      res.status(200).json({ success: "E-mail editado com sucesso" });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao atualizar seu e-mail"
      });
    }
  }
};
