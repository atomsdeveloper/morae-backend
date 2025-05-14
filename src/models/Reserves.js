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
        cty: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          defaultValue: "",
        },
        originalname: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        filename: {
          type: DataTypes.STRING(100),
          allowNull: false,
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
}
