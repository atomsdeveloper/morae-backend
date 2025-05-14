"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Removendo colunas da tabela reserves
    await queryInterface.removeColumn("reserves", "filename");
    await queryInterface.removeColumn("reserves", "originalname");
  },

  // async down(queryInterface, Sequelize) {
  //   // Adicionando de volta as colunas (caso você deseje fazer rollback)
  //   await queryInterface.addColumn("reserves", "filename", {
  //     type: Sequelize.STRING,
  //     allowNull: true,
  //   });

  //   await queryInterface.addColumn("reserves", "originalname", {
  //     type: Sequelize.STRING,
  //     allowNull: true,
  //   });
  // },
};
