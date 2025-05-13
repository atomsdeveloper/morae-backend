import Sequelize from "sequelize";

// Database
import configDatabase from "../config/database.js";

// Models
import User from "./User.js";
import Reserves from "./Reserves.js";
import UserReserve from "./UserReserve.js";

// Model Associations
import associateModels from "./associations.js";

const sequelize = new Sequelize(configDatabase);

User.init(sequelize);
Reserves.init(sequelize);
UserReserve.init(sequelize);
associateModels();

export { sequelize, User, Reserves, UserReserve };
