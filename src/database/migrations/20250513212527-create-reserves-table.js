"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the "students" table
    await queryInterface.createTable("reserves", {
      id: {
        type: Sequelize.INTEGER, // Integer type
        autoIncrement: true, // Auto-incrementing
        primaryKey: true, // Primary key
        allowNull: false, // Not null
      },
      name: {
        type: Sequelize.STRING(100), // String type with a maximum length of 100
        allowNull: false, // Not null
      },
      country: {
        type: Sequelize.STRING(100), // String type with a maximum length of 100
        allowNull: false, // Not null
      },
      cty: {
        type: Sequelize.STRING(100), // String type with a maximum length of 100
        allowNull: false, // Not null
        unique: true, // Unique constraint
      },
      created_at: {
        type: Sequelize.DATE, // Date type
        allowNull: false, // Not null
      },
      updated_at: {
        type: Sequelize.DATE, // Date type
        allowNull: false, // Not null
      },
    });
  },
  // Rollback the migration
  // This function will be called when you want to undo the migration
  // It will drop the "students" table
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reserves");
  },
};
