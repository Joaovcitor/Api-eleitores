const Lideranca = require("../db/models/LiderencaPolitica");

module.exports = class EleitorController {
  static async store(req, res) {
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

    try {
      const user = await Lideranca.findOne({ where: { cpf: numCpf } });
      if (user) {
        return res.status(400).json({ errors: "Liderança já cadastrada." });
      }

      const userCreate = {
        name,
        tituloDeEleitorNumero,
        zona,
        secao,
        telefone,
        cpf: numCpf,
        rg,
        enderecoRua: enderecoRua,
        email: email,
        enderecoNumero: enderecoNumero,
        enderecoBairro: enderecoBairro
      };

      await Lideranca.create(userCreate);

      res.status(200).json({ success: "Liderança criada com sucesso!" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao criar a liderança" });
    }
  }
};
