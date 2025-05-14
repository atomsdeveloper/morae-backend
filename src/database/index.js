// Importando os módulos necessários usando ES Modules
import Sequelize from "sequelize";
import dbConfig from "../config/database.js";

// Importando os models
import User from "../models/User.js";
import UserReserve from "../models/UserReserve.js";
import Photo from "../models/Photo.js";
import Reserves from "../models/Reserves.js";

// Array contendo todos os models que serão inicializados com a conexão
const models = [User, UserReserve, Photo, Reserves];

// Criando uma nova instância do Sequelize com as configurações do banco de dados
const connection = new Sequelize(dbConfig);

// This function initializes the database connection and all the models
models.forEach((modelConnect) => modelConnect.init(connection));
// This function is used to synchronize the models with the database
models.forEach(
  (modelConnect) =>
    modelConnect.associate && modelConnect.associate(connection.models)
);
