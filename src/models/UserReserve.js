import { Model, DataTypes } from "sequelize";
// Importing bcrypt for password hashing
export default class UserReserve extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          validate: {
            notNull: { msg: "A data de início da reserva é obrigatória" },
            isDate: { msg: "A data de início deve ser válida" },
          },
        },
        end_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          validate: {
            notNull: { msg: "A data de término da reserva é obrigatória" },
            isDate: { msg: "A data de término deve ser válida" },
          },
        },
      },
      {
        sequelize,
        modelName: "UserReserve",
        tableName: "user_reserves",
        underscored: true, // created_at, updated_at
        indexes: [
          {
            unique: true,
            fields: ["reserve_id", "reserve_date"], // <-- Restringe duplicidade de reserva no mesmo dia
          },
        ],
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: models.UserReserve,
      foreignKey: "reserve_id",
      otherKey: "user_id",
      as: "users",
    });
  }
}
