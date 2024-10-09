const validator = require("validator");

module.exports = function checkData(req, res, next) {
  const { name, password, confirmPassword, email } = req.body;

  if (validator.isEmpty(name)) {
    return res.status(400).json({ errors: "Nome não pode ficar em branco" })
  }

  if (name.length < 3 || name.length > 155) {
    return res.status(400).json({ errors: "Nome deve ter entre 3 a 155 caracteres" })
  }

  if (password.length < 6 || password.length > 30) {
    return res.status(400).json({ errors: "Senha deve ter entre 6 a 30 caracteres" })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ errors: "Senhas não iguais" })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ errors: "E-mail é invalido" })
  }

  next()
}