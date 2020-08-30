const mysql = require("mysql");
const config = require("./config");
const { promisify } = require("util");

const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database Conected Falied: ", err.code);
    return;
  }

  if (connection) connection.release();
  console.log("Database Conected Success");
  return;
});

pool.query = promisify(pool.query);
module.exports = pool;
