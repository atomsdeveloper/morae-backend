"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("reserves", [
      {
        name: "Reserva da Montanha",
        country: "Brasil",
        city: "Gramado",
        description: "Linda casa com vista para as montanhas e lareira.",
        rooms: 3,
        type: "casa",
        price: 450.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Apartamento Urbano",
        country: "Brasil",
        city: "São Paulo",
        description: "Apartamento moderno no centro da cidade.",
        rooms: 2,
        type: "ap",
        price: 300.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Casa da Praia",
        country: "Brasil",
        city: "Florianópolis",
        description: "Casa com piscina a 200m da praia.",
        rooms: 4,
        type: "casa",
        price: 600.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("reserves", null, {});
  },
};
