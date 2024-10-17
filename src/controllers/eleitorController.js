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
      enderecoNumero,
      email
    } = req.body;

    const id = req.params.id;

    try {
      const user = await Eleitor.findOne({ where: { cpf: numCpf } });
      const lideranca = await Lideranca.findByPk(id);

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
        liderancaId: id,
        enderecoNumero: enderecoNumero
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

  static async index(req, res) {
    try {
      const eleitores = await Eleitor.findAll();
      res.status(200).json({ eleitores });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao buscar os eleitores"
      });
    }
  }

  static async eleitoresDaLideranca(req, res) {
    const id = req.params.id;

    try {
      const lideranca = await Lideranca.findOne({ where: { id: id } });
      if (!lideranca) {
        return res.status(400).json({ errors: "Essa liderança não existe" });
      }

      const eleitores = await Eleitor.findAll({ where: { liderancaId: id } });
      if (!eleitores) {
        return res.status(400).json({
          errors: "Não foi possível achar eleitores para essa liderança"
        });
      }

      res.status(200).json({ eleitores });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors:
          "Ocorreu um erro desconhecido ao buscar os eleitores dessa liderança"
      });
    }
  }

  static async show(req, res) {
    const id = req.params.id;

    try {
      const eleitor = await Eleitor.findOne({ where: { id: id } });

      if (!eleitor) {
        return res.status(400).json({ errors: "Esse eleitor não existe" });
      }

      res.status(200).json({ eleitor });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors:
          "Ocorreu um erro desconhecido ao buscar o eleitor. Tente novamente"
      });
    }
  }
};
