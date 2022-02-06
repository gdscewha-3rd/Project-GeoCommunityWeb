require('dotenv').config();
const express = require('express'); 
const session = require('express-session');

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.MYSQL_PASSWORD,
    "database": "sleact",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "cookie": {
      httpOnly: true,
      secure: false,
    }
  },
  "test": {
    "username": "root", 
    "password": process.env.MYSQL_PASSWORD,
    "database": "sleact",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "cookie": {
      httpOnly: true,
      secure: false,

    }
  },
  "production": {
    "username": "root",
    "password": process.env.MYSQL_PASSWORD,
    "database": "sleact",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "cookie": {
      httpOnly: true,
      secure: false,
    }
  }
}
