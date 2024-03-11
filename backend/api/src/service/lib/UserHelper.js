const axios = require("axios");
const AxiosHelper = require("./axiosHelper");
const HTTPError = require("../../exceptions/HTTPError");

class UserHelper extends AxiosHelper {
    constructor(configService) {
        super();
        this.configService = configService;
    }
    
}

module.exports = UserHelper;
