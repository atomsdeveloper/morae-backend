"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the "alunos" table
    await queryInterface.createTable("users", {
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
      password_hash: {
        type: Sequelize.STRING(100), // String type with a maximum length of 100
        allowNull: false, // Not null
      },
      email: {
        type: Sequelize.STRING(100), // String type with a maximum length of 100
        allowNull: false, // Not null
        unique: true, // Unique constraint
      },
      role: {
        type: Sequelize.ENUM("admin", "read"), // Adicionando o ENUM com valores "admin" e "read"
        allowNull: false,
        defaultValue: "read", // Valor padrão caso não seja especificado
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
  // It will drop the "users" table
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
