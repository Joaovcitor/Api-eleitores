const Demanda = require("../db/models/Demanda");

module.exports = class DemandaController {

  static async index(req, res) {
    try {
      const demandas = await Demanda.findAll();

      if (!demandas) {
        return res.status(404).json({ errors: "Não existem demandas." })
      }

      res.status(200).json({ demandas })
    } catch (e) {
      console.log(e)
    }
  }

  static async show(req, res) {
    const id = req.params.id
    try {
      const demanda = await Demanda.findOne({ where: { id: id } });

      if (!demanda) {
        return res.status(404).json({ errors: "Não existe demanda com esse ID." })
      }

      res.status(200).json({ demanda })
    } catch (e) {
      console.log(e)
    }
  }

  static async store(req, res) {
    const { descricao_demanda, status, eleitorId, liderancaId } = req.body;

    try {
      const demandaCriada = {
        descricao_demanda: descricao_demanda,
        status: status,
        eleitorId: eleitorId,
        liderancaId: liderancaId
      }

      await Demanda.create(demandaCriada);

      res.status(200).json({ success: "Demanda criada com sucesso" })
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido ao criar a demanda." })
    }
  }

  static async update(req, res) {
    const { descricao_demanda, status } = req.body;
    const id = req.params.id

    const demandaEditada = {
      descricao_demanda: descricao_demanda,
      status: status
    }

    try {
      await Demanda.update(demandaEditada, { where: { id: id } });

      res.status(200).json({ success: "Demanda Editada com sucesso" })
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido ao editar essa demanda." })
    }
  }
}