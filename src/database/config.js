require("dotenv").config();

const dataConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  charset: "utf8_general_ci",
  timezone: "-0400",
};

module.exports = dataConfig;
