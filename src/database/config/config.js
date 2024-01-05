const { envs } = require("../../config/environments/environments")

module.exports = {
  development: {
    username: envs.DB_USERNAME,
    password: envs.DB_PASSWORD,
    database: envs.DB_DATABASE,
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    dialect: 'postgres',
    logging: false
  }
}
