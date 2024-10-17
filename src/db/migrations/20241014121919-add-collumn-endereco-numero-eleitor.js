"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Eleitors", "enderecoNumero", {
      type: Sequelize.STRING,
      validate: {
        len: {
          args: [1, 10],
          msg: "Número da residência, não pode ficar em branco!"
        }
      },
      allowNull: false,
      defaultValue: "0"
    });
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
