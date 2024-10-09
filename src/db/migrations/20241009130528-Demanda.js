'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Demanda", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      descricao_demanda: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: { args: [3, 800], msg: "Descrição deve ter entre 3 e 800 caracteres" }
        }
      },
      status: {
        type: Sequelize.ENUM("Pendente", "Em analise", "Resolvida"),
        allowNull: false,
        defaultValue: "Pendente"
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
    await queryInterface.dropTable("Demanda")
  }
};
