/**
 * UserService Class
 */

const Service = require("./Service");
const bcrypt = require("bcrypt");
const HTTPNotFound = require("../exceptions/HTTPNotFound");
const HTTPBadRequest = require("../exceptions/HTTPBadRequest");
const HTTPForbidden = require("../exceptions/HTTPForbidden");
const HTTPInternalServerError = require("../exceptions/HTTPInternalServerError");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const Like = require('../models/Like') // Replace with your actual product model

class LikeService extends Service {
    constructor(model) {
        super(model);
        this.model = model

    }

}

module.exports = new LikeService(Like);
