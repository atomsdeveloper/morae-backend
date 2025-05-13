// Models
import User from "./User.js";
import Reserves from "./Reserves.js";
import UserReserve from "./UserReserve.js";

export default function associateModels() {
  // Associação User -> UserReserve
  User.hasMany(UserReserve, { foreignKey: "user_id" });
  UserReserve.belongsTo(User, { foreignKey: "user_id" });

  // Associação Reserve -> UserReserve
  Reserves.hasMany(UserReserve, { foreignKey: "reserve_id" });
  UserReserve.belongsTo(Reserves, { foreignKey: "reserve_id" });
}
