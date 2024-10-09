'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Demanda", "eleitorId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Eleitor",
        key: "id"
      }
    });
    await queryInterface.addColumn("Demanda", "liderancaId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Eleitor",
        key: "id"
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
