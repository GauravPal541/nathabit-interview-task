const config = require("../config/service.config");
const service = require("../service/Movie");
const Controller = require("./Controller");
const logger = require("../logger");

class MovieController extends Controller {
    constructor(service) {
        super(service);
        this.service = service;
    }

    getAllMovies = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const data = await this.service.getAllMovies(req);
            this.response(res, data);
        } catch (err) {
            this.response(res, err, err.status);
        }
    };


    getAllFavourite = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const data = await this.service.getAllFavourite(req);
            this.response(res, data);
        } catch (err) {
            this.response(res, err, err.status);
        }
    };

    markAsFavourite = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const data = await this.service.markAsFavourite(req);
            this.response(res, data);
        } catch (err) {
            this.response(res, err, err.status);
        }
    };

    like = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const data = await this.service.like(req);
            this.response(res, data);
        } catch (err) {
            this.response(res, err, err.status);
        }
    };
    
}

module.exports = new MovieController(service);
