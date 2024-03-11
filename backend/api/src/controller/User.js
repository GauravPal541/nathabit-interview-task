const config = require("../config/service.config");
const service = require("../service/User");
const Controller = require("./Controller");
const logger = require("../logger");

class UserController extends Controller {
    constructor(service) {
        super(service);
        this.service = service;
    }

}

module.exports = new UserController(service);
