require('dotenv').config()

const env = require('env-var')

exports.envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    DB_URI: env.get('DB_URI').required().asString(),
    NODE_ENV: env.get('NODE_ENV').required().asString(),
    SECRET_JWT_SEED: env.get('SECRET_JWT_SEED').required().asString(),
    JWT_EXPIRE_IN: env.get('JWT_EXPIRE_IN').required().asString(),
    DB_USERNAME: env.get('DB_USERNAME').required().asString(),
    DB_PASSWORD: env.get('DB_PASSWORD').required().asString(),
    DB_DATABASE: env.get('DB_DATABASE').required().asString(),
    DB_PORT: env.get('DB_PORT').required().asPortNumber(),
    DB_HOST: env.get('DB_HOST').required().asString()
}