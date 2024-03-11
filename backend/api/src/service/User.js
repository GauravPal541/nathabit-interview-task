const ConfigHelper = require("./lib/UserHelper");
const config = require("../config/service.config");
const HTTPError = require("../exceptions/HTTPError");

class UserService {
    constructor() {
        this.configHelper = new ConfigHelper(config.CONFIG_SERVICE);
    }

}

module.exports = new UserService();
