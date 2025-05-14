require("dotenv").config(); // Load environment variables from .env file

module.exports = {
  dialect: "postgres", // Use postgreSQL as the database dialect
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  define: {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    underscored: true, // Use snake_case for column names
    underscoredAll: true, // Use snake_case for all column names
    createdAt: "created_at", // Rename createdAt to created_at
    updatedAt: "updated_at", // Rename updatedAt to updated_at
  },
  dialectOptions: {
    timezone: "America/Sao_Paulo", // Set the timezone to Brazil
  },
  timezone: "America/Sao_Paulo", // Set the timezone to Brazil
};
