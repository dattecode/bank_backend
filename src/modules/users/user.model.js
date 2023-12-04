import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";
import { v4 as uuidv4 } from "uuid";
import { encryptedPassword } from "../../plugins/encipted-password.plugin.js";

export const UserModel = sequelize.define(
  "user_model",
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true,
    },
    accountNumber: {
      type: DataTypes.STRING(),
      unique: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    amount: {
      type: DataTypes.FLOAT(),
      allowNull: false,
      defaultValue: 1000,
    },
    status: {
      type: DataTypes.ENUM("aviable", "disable"),
      allowNull: false,
      defaultValue: "aviable",
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await encryptedPassword(user.password);
      },
    },
  }
);
