"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Renan Nascimento",
        email: "renan3@gmail.com",
        password_hash: "hashed_password_1",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Maria Silva",
        email: "maria3@gmail.com",
        password_hash: "hashed_password_2",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
