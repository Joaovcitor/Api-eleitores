const Eleitor = require("../db/models/Eleitor");
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
      email
    } = req.body;

    const id = req.params.id;

    try {
      const user = await Eleitor.findOne({ where: { cpf: numCpf } });
      const lideranca = await Lideranca.findOne({ where: { id: id } });

      if (!lideranca) {
        return res
          .status(404)
          .json({ errors: "Essa Liderança não existe, verifique o ID" });
      }
      if (user) {
        return res.status(400).json({ errors: "Eleitor já cadastrado." });
      }

      const userCreate = {
        name,
        tituloDeEleitorNumero,
        zona,
        secao,
        telefone,
        cpf: numCpf,
        rg,
        enderecoRua,
        email,
        liderancaId: id
      };

      await Eleitor.create(userCreate);

      res.status(200).json({ success: "Eleitor criado com sucesso!" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao criar o eleitor" });
    }
  }
};
