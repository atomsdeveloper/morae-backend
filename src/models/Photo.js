import { Model, DataTypes } from "sequelize";

export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: DataTypes.STRING,
        originalname: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "photos",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.Reserves, {
      foreignKey: "reserve_id",
      as: "reserve",
    });
  }
}
