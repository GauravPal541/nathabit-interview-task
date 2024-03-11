const dotenv = require("dotenv");
const path = require("path");

//resolve environment variable
dotenv.config({
  path: path.resolve(__dirname, `${process.env.ENV}.env`),
});

//export various environment varaibles from here
module.exports = {
  ENV: process.env.ENV || "local",
  SERVICE_NAME: process.env.SERVICE_NAME || "auth",
  SERVICE_VERSION: process.env.SERVICE_VERSION || "1.0.0",
  BUILD_NUMBER: process.env.BUILD_NUMBER || "#",
  SERVICE_BASE: process.env.SERVICE_BASE || "/api/v1/auth",
  USER_SERVICE: process.env.USER_SERVICE || "http://user-service:3000/api/v1",
  MAX_RETRIES: process.env.MAX_RETRIES || 1,
  RETRY_DELAY: process.env.RETRY_DELAY || 500,
  NOTIFICATION_SERVICE:
    process.env.NOTIFICATION_SERVICE || "http://notification-service:3000/api/v1",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  JWT_SECRET: process.env.JWT_SECRET || "nthmicro_secret",
};
