import { Model, DataTypes } from "sequelize";
import urlConfig from "../config/urlConfig";

export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: {
          type: DataTypes.STRING(100),
          allowNull: true,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Filename não pode ser vazio",
            },
          },
        },
        originalname: {
          type: DataTypes.STRING(100),
          allowNull: true,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Originalname não pode ser vazio",
            },
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "users",
            key: "id",
          },
        },
        reserve_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "reserves",
            key: "id",
          },
        },
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            const filename = this.getDataValue("filename");
            const isCloudinary = filename.startsWith("http");
            return isCloudinary ? filename : `${urlConfig.baseURL}/${filename}`;
          },
        },
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
