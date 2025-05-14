import { Model, DataTypes } from "sequelize";
// Importing bcrypt for password hashing
import bcrypt from "bcryptjs";

// Model for the "users" table
// This model represents the structure of the "users" table in the database
// and provides methods to interact with it
export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING(100), // String type with a maximum length of 100
          allowNull: false, // Not null
          defaultValue: "", // Default value is an empty string
          validate: {
            notNull: {
              args: true, // Validation to ensure the field is not null
              msg: "O nome não pode ser nulo", // Error message
            },
            is: {
              args: /^[a-zA-Z\s]+$/, // Regular expression to allow only letters and spaces
              msg: "O nome deve conter apenas letras e espaços", // Error message
            },
            // Custom validation to check the length of the name
            len: {
              args: [3, 100], // Length validation between 3 and 100 characters
              msg: "O nome deve ter entre 3 e 100 caracteres", // Error message
            },
          },
        },
        email: {
          type: DataTypes.STRING(100), // String type with a maximum length of 100
          allowNull: false, // Not null
          unique: {
            args: true, // Unique constraint
            msg: "O email já está cadastrado", // Error message
          }, // Unique constraint
          defaultValue: "", // Default value is an empty string
          validate: {
            notNull: {
              args: true, // Validation to ensure the field is not null
              msg: "O email não pode ser nulo", // Error message
            },
            isEmail: {
              args: true, // Validation to ensure the field is a valid email
              msg: "O email deve ser válido", // Error message
            },
          },
        },
        password_hash: {
          type: DataTypes.STRING(100), // String type with a maximum length of 100
          allowNull: false, // Not null
          defaultValue: "", // Default value is an empty string
        },
        // Virtual field for password
        // This field is not stored in the database
        // but is used for validation and hashing
        password: {
          type: DataTypes.VIRTUAL, // Virtual field
          allowNull: false, // Not null
          defaultValue: "", // Default value is an empty string
          validate: {
            notNull: {
              args: true, // Validation to ensure the field is not null
              msg: "A senha não pode ser nula", // Error message
            },
            len: {
              args: [12, 100], // Length validation between 6 and 100 characters
              msg: "A senha deve ter entre 12 e 100 caracteres", // Error message
            },
            // Custom validation to check if the password contains at least one letter and one number
            isAlphanumeric(value) {
              if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
                throw new Error(
                  "A senha deve conter pelo menos uma letra e um número"
                ); // Error message
              }
            },
            // Custom validation to check if the password contains at least one special character
            isSpecialCharacter(value) {
              if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                throw new Error(
                  "A senha deve conter pelo menos um caractere especial"
                ); // Error message
              }
            },
            // Custom validation to check if the password contains at least one uppercase letter
            isUppercase(value) {
              if (!/[A-Z]/.test(value)) {
                throw new Error(
                  "A senha deve conter pelo menos uma letra maiúscula"
                ); // Error message
              }
            },
            // Custom validation to check if the password contains at least one lowercase letter
            isLowercase(value) {
              if (!/[a-z]/.test(value)) {
                throw new Error(
                  "A senha deve conter pelo menos uma letra minúscula"
                ); // Error message
              }
            },
            // Custom validation to check if the password contains at least one digit
            isDigit(value) {
              if (!/\d/.test(value)) {
                throw new Error("A senha deve conter pelo menos um dígito"); // Error message
              }
            },
            // Custom validation to check if the password contains at least one symbol
            isSymbol(value) {
              if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                throw new Error("A senha deve conter pelo menos um símbolo"); // Error message
              }
            },
          },
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
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
    this.belongsToMany(models.Reserves, {
      through: models.UserReserve,
      foreignKey: "user_id",
      otherKey: "reserve_id",
      as: "reserves",
    });
  }
}
