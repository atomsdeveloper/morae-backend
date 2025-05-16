import { Model, DataTypes } from "sequelize";
// Importing bcrypt for password hashing
import bcrypt from "bcryptjs";

// Model for the "reserves" table
// This model represents the structure of the "reserves" table in the database
// and provides methods to interact with it
export default class Reserves extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          defaultValue: "",
          validate: {
            notNull: {
              msg: "O nome não pode ser nulo",
            },
            is: {
              args: /^[a-zA-Z\s]+$/,
              msg: "O nome deve conter apenas letras e espaços",
            },
            len: {
              args: [3, 100],
              msg: "O nome deve ter entre 3 e 100 caracteres",
            },
          },
        },
        country: {
          type: DataTypes.STRING(100),
          allowNull: false,
          defaultValue: "",
        },
        city: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          defaultValue: "",
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        rooms: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
          validate: {
            isInt: { msg: "O número de quartos deve ser um número inteiro" },
            min: {
              args: [1],
              msg: "Deve haver pelo menos 1 quarto",
            },
          },
        },
        type: {
          type: DataTypes.STRING(50),
          allowNull: false,
          defaultValue: "hotel",
          validate: {
            notEmpty: { msg: "O tipo não pode estar vazio" },
          },
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.0,
          validate: {
            isDecimal: { msg: "O preço deve ser um número decimal" },
            min: {
              args: [0],
              msg: "O preço não pode ser negativo",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "Reserves",
        tableName: "reserves",
      }
    );
    // Adding hooks to the model
    // This hook will be called before saving the user to the database
    // It will hash the password using bcrypt
    // and store the hashed password in the password_hash field
    this.addHook("beforeSave", async (user) => {
      // Hash the password before saving it to the database
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8); // Hashing the password with a salt rounds of 8
      }
    });
    return this;
  }

  passwordIsValid(password) {
    // This method checks if the provided password is valid
    // by comparing it with the hashed password stored in the database
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: models.UserReserve,
      foreignKey: "reserve_id",
      otherKey: "user_id",
      as: "users",
    });

    this.hasMany(models.Photo, {
      foreignKey: "reserve_id",
      as: "photos",
    });
  }
}
