const dotenv = require('dotenv');
const path = require('path');

//resolve environment variable
dotenv.config({
    path: path.resolve(__dirname, `${process.env.ENV}.env`),
});

//export various environment varaibles from here
module.exports = {
    ENV: process.env.ENV || 'local',
    SERVICE_NAME: process.env.SERVICE_NAME || 'db',
    SERVICE_BASE: process.env.SERVICE_BASE || '/api/v1/db',
    SERVICE_VERSION: process.env.SERVICE_VERSION || '1.0.0',
    DB_HOST: process.env.DB_HOST || '',
    DB_USER: process.env.DB_USER || '',
    DB_PASS: process.env.DB_PASS || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_DIALECT: process.env.DB_DIALECT || '',
    DB_PORT: process.env.DB_PORT || '',
    POOL_MAX: parseInt(process.env.POOL_MAX) || 5,
    POOL_MIN: parseInt(process.env.POOL_MIN) || 0,
    POOL_ACQUIRE: parseInt(process.env.POOL_ACQUIRE) || 30000,
    POOL_IDLE: parseInt(process.env.POOL_IDLE) || 10000
};
