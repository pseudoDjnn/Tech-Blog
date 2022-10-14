// Sequelize import form library
const Sequelize = require("sequelize");

require("dotenv").config();

// connections to the database; passing in MySQL
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_N, process.env.DB_U, process.env.DB_PW, {
      host: "localhost",
      dialect: "mysql",
      prot: 3306,
    });

module.exports = sequelize;
