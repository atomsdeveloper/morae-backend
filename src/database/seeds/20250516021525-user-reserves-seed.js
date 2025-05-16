"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("user_reserves", [
      {
        user_id: 5,
        reserve_id: 1,
        start_date: "2025-05-10",
        end_date: "2025-05-15",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        reserve_id: 2,
        start_date: "2025-06-01",
        end_date: "2025-06-05",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        reserve_id: 3,
        start_date: "2025-07-20",
        end_date: "2025-07-25",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_reserves", null, {});
  },
};
