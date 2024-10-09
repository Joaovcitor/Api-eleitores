const Eleitor = require("../db/models/Eleitor");

module.exports = class EleitorController {
  static async store(req, res) {
    const { name, password, email } = req.body;

    try {
      const user = await Eleitor.findOne({ where: { email: email } });
      if (user) {
        return res.status(400).json({ errors: "Usuário já cadastrado com esse e-mail" })
      }
      const salt = bcryptjs.genSaltSync(10);
      const hashPassword = bcryptjs.hashSync(password, salt);

      console.log("comprimento da senha:", hashPassword.length)

      const userCreate = {
        name: name,
        password: hashPassword,
        email: email
      }

      await Eleitor.create(userCreate);

      req.session.userId = userCreate.id;

      res.status(200).json({ success: "Usuário criado com sucesso!" })
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido ao criar o usuário" })
    }
  }
}