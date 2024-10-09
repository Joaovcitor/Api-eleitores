const conn = require("../conn");
const { DataTypes } = require("sequelize");

const Demandas = conn.define("Demandas", {
  descricao_demanda: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: { args: [3, 800], msg: "Descrição deve ter entre 3 e 800 caracteres" }
    }
  },
  status: {
    type: DataTypes.ENUM("Pendente", "Em analise", "Resolvida"),
    allowNull: false,
    defaultValue: "Pendente"
  },
  eleitorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Eleitor",
      key: "id"
    }
  },
  liderancaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Lideranca",
      key: "id"
    }
  },
});

module.exports = Demandas