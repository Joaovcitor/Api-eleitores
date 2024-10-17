const validator = require("validator");
const { cpf } = require("cpf-cnpj-validator");

module.exports = function checkData(req, res, next) {
  const {
    name,
    tituloDeEleitorNumero,
    zona,
    secao,
    telefone,
    cpf: numCpf,
    rg,
    enderecoRua,
    email,
    enderecoNumero,
    enderecoBairro
  } = req.body;

  if (!name || validator.isEmpty(name)) {
    return res.status(400).json({ errors: "Nome não pode ficar em branco" });
  }

  if (!enderecoNumero || enderecoNumero.length < 1) {
    return res
      .status(400)
      .json({ errors: "Preencha todas as informações do endereço" });
  }

  if (name.length < 3 || name.length > 155) {
    return res
      .status(400)
      .json({ errors: "Nome deve ter entre 3 a 155 caracteres" });
  }

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ errors: "E-mail é inválido" });
  }

  if (!tituloDeEleitorNumero || validator.isEmpty(tituloDeEleitorNumero)) {
    return res
      .status(400)
      .json({ errors: "Título de eleitor não pode ficar vazio." });
  }

  if (!zona || zona.length < 1 || zona.length > 3) {
    return res
      .status(400)
      .json({ errors: "Zona só pode ter entre 1 a 3 caracteres" });
  }

  if (!secao || secao.length < 1 || secao.length > 4) {
    return res
      .status(400)
      .json({ errors: "Seção tem que ter entre 1 a 4 caracteres" });
  }

  if (!telefone || validator.isEmpty(telefone)) {
    return res.status(400).json({
      errors: "Telefone não pode ficar vazio, caso não tenha, coloque 0"
    });
  }

  if (!numCpf || numCpf.length > 11) {
    return res
      .status(400)
      .json({ errors: "CPF tem que ter exatamente 11 caracteres!" });
  }

  if (!rg || validator.isEmpty(rg)) {
    return res.status(400).json({
      errors: "RG não pode ficar vazio. Se não tiver o documento, digite 0"
    });
  }

  if (!enderecoRua || validator.isEmpty(enderecoRua)) {
    return res
      .status(400)
      .json({ errors: "Endereço da rua não pode ficar vazio" });
  }

  if (!cpf.isValid(numCpf)) {
    return res.status(400).json({ errors: "CPF digitado é inválido" });
  }

  next();
};
