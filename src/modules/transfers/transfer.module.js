import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

export const TransferModel = sequelize.define("transfer_model",{
  id:{
    primaryKey:true,
    type: DataTypes.INTEGER(),
    autoIncrement:true,
    allowNull:false,
  },
  amount:{
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  senderAccount:{
    type: DataTypes.STRING(),
    allowNull:false
  },
  reciverAccount:{
    type: DataTypes.STRING(),
    allowNull:false
  }
})