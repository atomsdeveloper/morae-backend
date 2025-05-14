"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("user_reserves", [
      {
        user_id: 1,
        reserve_id: 1,
        reserve_date: new Date("2025-06-01"), // Data futura simulada
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        reserve_id: 2,
        reserve_date: new Date("2025-07-18"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        reserve_id: 2,
        reserve_date: new Date("2025-06-01"), // Data futura simulada
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_reserves", null, {});
  },
};
