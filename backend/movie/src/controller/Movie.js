// Example usage in a route or controller
const express = require('express')
const service = require('../service/Movie')
const Controller = require('./Controller')
const logger = require('../logger')

class MovieController extends Controller {
    constructor(service) {
        super(service)
    }

    bulkInsert = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const result = await this.service.bulkInsert(req.body);
            this.response(res, result);
        } catch (error) {
            logger.error(error.message);
            this.response(res, error, error.status);
        }
    };
}

module.exports = new MovieController(service)
