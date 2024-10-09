const conn = require("../conn");
const { DataTypes } = require("sequelize");

const Users = conn.define("Users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: { args: [3, 155], msg: "Nome deve ter entre 3 e 155 caracteres" }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 70],
        msg: "Senha não pode ter menos que 3 caracteres e mais que 30"
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
});

module.exports = Users