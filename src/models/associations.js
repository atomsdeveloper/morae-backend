import Photo from "./Photo.js";
import User from "./User.js";
import UserReserve from "./UserReserve.js";
import Reserves from "./Reserves.js";

export default function associateModels() {
  // User -> UserReserve
  User.hasMany(UserReserve, { foreignKey: "user_id" });
  UserReserve.belongsTo(User, { foreignKey: "user_id" });

  // Reserves -> UserReserve
  Reserves.hasMany(UserReserve, { foreignKey: "reserve_id" });
  UserReserve.belongsTo(Reserves, { foreignKey: "reserve_id" });

  // User -> Photo
  User.hasMany(Photo, { foreignKey: "user_id", as: "photos" });
  Photo.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // Reserves -> Photo
  Reserves.hasMany(Photo, { foreignKey: "reserve_id", as: "photos" });
  Photo.belongsTo(Reserves, { foreignKey: "reserve_id", as: "reserve" });
}
