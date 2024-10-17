"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Demandas", "eleitorId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Eleitors",
        key: "id"
      }
    });
    await queryInterface.changeColumn("Demandas", "liderancaId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Eleitors",
        key: "id"
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Demandas", "eleitorId", {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.changeColumn("Demandas", "liderancaId", {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
