import { Sequelize } from "sequelize";
import { envs } from "../enviroments/envioroments.js";

export const sequelize = new Sequelize(envs.DB_URL, {
  logging: false,
});

export const authenticadted = async () => {
  try {
    await sequelize.authenticate();
    console.log("Aunthenticate On");
  } catch (error) {
    console.log(error);
  }
};

export const syncUp = async () => {
  try {
    await sequelize.sync();
    console.log("Sync On");
  } catch (error) {
    console.log(error);
  }
};
