"use strict";

require('dotenv').config();

module.exports = {
  // If using online database
  // development: {
  // use_env_variable: "DABASE_URL"
  // },
  development: {
    database: 'books',
    username: 'postgres',
    password: null,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    database: 'book_test',
    username: 'postgres',
    password: null,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};
//# sourceMappingURL=config.js.map