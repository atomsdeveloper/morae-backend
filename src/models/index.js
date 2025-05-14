import Sequelize from "sequelize";

// Database
import configDatabase from "../config/database.js";

// Models
import User from "./User.js";
import Reserves from "./Reserves.js";
import UserReserve from "./UserReserve.js";

// Model Associations
import associateModels from "./associations.js";
import Photo from "./Photo.js";

const sequelize = new Sequelize(configDatabase);

User.init(sequelize);
Reserves.init(sequelize);
UserReserve.init(sequelize);
Photo.init(sequelize);
associateModels({ User, Reserves, UserReserve, Photo });

export { sequelize, User, Reserves, UserReserve, Photo };
