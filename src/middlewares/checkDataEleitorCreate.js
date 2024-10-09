const validator = require("validator");

module.exports = function checkData(req, res, next) {
  const { name, tituloDeEleitorNumero, zona, secao, telefone, cpf, rg, enderecoRua, email } = req.body;

  if (validator.isEmpty(name)) {
    return res.status(400).json({ errors: "Nome não pode ficar em branco" })
  }

  if (name.length < 3 || name.length > 155) {
    return res.status(400).json({ errors: "Nome deve ter entre 3 a 155 caracteres" })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ errors: "E-mail é invalido" })
  }

  if (validator.isEmpty(tituloDeEleitorNumero)) {
    return res.status(400).json({ errors: "Titulo de eleitor não pode ficar vázio." })
  }

  if (zona.length < 1 || zona.length > 3) {
    return res.status(400).json({ errors: "Zona só pode ter entre 1 a 3 caracteres" })
  }

  if (secao.length < 1 || secao.length > 4) {
    return res.status(400).json({ errors: "Seção tem quer ter entre 1 a 4 caracteres" })
  }

  if (validator.isEmpty(telefone)) {
    return res.status(400).json({ errors: "Telefone não pode ficar vázio, caso não tenha, coloque 0" })
  }

  next()
}