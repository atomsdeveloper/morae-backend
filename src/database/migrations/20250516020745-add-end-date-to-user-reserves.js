"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "user_reserves",
      "reserve_date",
      "start_date"
    );
    await queryInterface.addColumn("user_reserves", "end_date", {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_DATE"), // Opcional: evita erro em registros antigos
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_reserves");
  },
};
