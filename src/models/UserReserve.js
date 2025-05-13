// models/UserReserve.js
export default class UserReserve extends Model {
  static init(sequelize) {
    super.init(
      {
        reserve_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          validate: {
            notNull: { msg: "A data da reserva é obrigatória" },
            isDate: { msg: "A data da reserva deve ser válida" },
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
