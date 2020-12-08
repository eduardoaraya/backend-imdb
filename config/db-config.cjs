require('./env.cjs');
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DRIVER,
    "port": process.env.DB_PORT
  },
  "test": {
    "username": process.env.DB_TEST_USER,
    "password": process.env.DB_TEST_PASS,
    "database": process.env.DB_TEST_NAME,
    "host": process.env.DB_TEST_HOST,
    "dialect": process.env.DB_TEST_DRIVER,
    "port": process.env.DB_TEST_PORT
  },
  "production": {
    "username": process.env.DB_PRODUCTION_USER,
    "password": process.env.DB__PRODUCTION_PASS,
    "database": process.env.DB_PRODUCTION_NAME,
    "host": process.env.DB_PRODUCTION_HOST,
    "dialect": process.env.DB_PRODUCTION_DRIVER,
    "port": process.env.DB_PRODUCTION_PORT
  }
}