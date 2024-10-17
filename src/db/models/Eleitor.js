const conn = require("../conn");
const { DataTypes } = require("sequelize");
const Lideranca = require("./LiderencaPolitica");

const Eleitor = conn.define("Eleitors", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: { args: [3, 155], msg: "Nome deve ter entre 3 e 155 caracteres" }
    }
  },
  tituloDeEleitorNumero: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [12, 12],
        msg: "Nº de inscrição tem que ter apenas 12 caracteres"
      }
    }
  },
  zona: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 3],
        msg: "zona tem de 1 a 3 caracteres"
      }
    }
  },
  secao: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 4],
        msg: "seção tem de 1 a 4 caracteres"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: "E-mail já existe" },
    validate: {
      isEmail: { msg: "E-mail invalido." }
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: "Telefone já existe" }
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: "CPF já existe" }
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: "RG já existe" }
  },
  enderecoRua: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 155],
        msg: "Rua deve ter entre 3 a 155 caracteres"
      }
    }
  },
  enderecoNumero: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 10],
        msg: "Número da residência, não pode ficar em branco!"
      }
    }
  },
  liderancaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Lideranca",
      key: "id"
    }
  }
});

Lideranca.hasMany(Eleitor, {
  foreignKey: "liderancaId"
});
Eleitor.belongsTo(Lideranca, {
  foreignKey: "liderancaId"
});

module.exports = Eleitor;
