require("dotenv").config();
module.exports = {
  dialect: "postgres",
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
    ssl: {
      require: true,
      rejectUnauthorized: false, // Change when up prod.
    },
    timezone: "America/Sao_Paulo",
  },
  timezone: "America/Sao_Paulo",
};
