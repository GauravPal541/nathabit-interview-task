const dotenv = require('dotenv');
const path = require('path');

//resolve environment variable
dotenv.config({
    path: path.resolve(__dirname, `${process.env.ENV}.env`),
});

//export various environment varaibles from here
module.exports = {
    ENV: process.env.ENV || 'local',
    SERVICE_NAME: process.env.SERVICE_NAME || 'api',
    SERVICE_BASE: process.env.SERVICE_BASE || '/api/v1',
    SERVICE_VERSION: process.env.SERVICE_VERSION || '1.0.0',
    USER_SERVICE:process.env.USER_SERVICE || 'http://user-service:3000/api/v1',
    MOVIE_SERVICE:process.env.MOVIE_SERVICE || 'http://movie-service:3000/api/v1'
};
