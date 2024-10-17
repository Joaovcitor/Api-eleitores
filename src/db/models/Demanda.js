const conn = require("../conn");
const { DataTypes } = require("sequelize");
const Eleitor = require("./Eleitor");
const Lideranca = require("./LiderencaPolitica");

const Demandas = conn.define("Demandas", {
  descricao_demanda: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [3, 800],
        msg: "Descrição deve ter entre 3 e 800 caracteres"
      }
    }
  },
  status: {
    type: DataTypes.ENUM("Pendente", "Em analise", "Resolvida"),
    allowNull: false,
    defaultValue: "Pendente"
  },
  eleitorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Eleitor",
      key: "id"
    }
  },
  liderancaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Lideranca",
      key: "id"
    }
  }
});

Eleitor.hasMany(Demandas, {
  foreignKey: "eleitorId"
});
Demandas.belongsTo(Eleitor, {
  foreignKey: "eleitorId"
});

Lideranca.hasMany(Demandas, {
  foreignKey: "liderancaId"
});
Demandas.belongsTo(Eleitor, {
  foreignKey: "eleitorId"
});

module.exports = Demandas;
