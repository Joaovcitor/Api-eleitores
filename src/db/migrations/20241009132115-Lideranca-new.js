'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Lideranca", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: { args: [3, 155], msg: "Nome deve ter entre 3 e 155 caracteres" }
        }
      },
      tituloDeEleitorNumero: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [12, 12],
            msg: "Nº de inscrição tem que ter apenas 12 caracteres"
          }
        }
      },
      zona: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 3],
            msg: "zona tem de 1 a 3 caracteres"
          }
        }
      },
      secao: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 4],
            msg: "seção tem de 1 a 4 caracteres"
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: { msg: "E-mail já existe" },
        validate: {
          isEmail: { msg: "E-mail invalido." }
        }
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: { msg: "Telefone já existe" },
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: { msg: "CPF já existe" },
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: { msg: "RG já existe" },
      },
      enderecoRua: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 155],
            msg: "Rua deve ter entre 3 a 155 caracteres"
          }
        }
      },
      enderecoNumero: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 10],
            msg: "Numero deve ter entre 1 a 10 caracteres"
          }
        }
      },
      enderecoBairro: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 10],
            msg: "Numero deve ter entre 1 a 10 caracteres"
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
