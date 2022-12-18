const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: true,
    },
    dialect: "mysql",
    dialectModule: require("mysql2"),
  }
);
//
module.exports = { sequelize };
