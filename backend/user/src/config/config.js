require("dotenv").config();
const config = require('../src/config/service.config');

module.exports = {
  development: {
    username: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
    host: config.DB_HOST,
    dialect: "mysql"
  },
  test: {
    username: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
    host: config.DB_HOST,
    dialect: "mysql"
  },
  production: {
    username: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
    host: config.DB_HOST,
    dialect: "mysql"
  }
}