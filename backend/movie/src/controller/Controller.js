/**
 * The Base Controller: All other controllers extends from this controller
 */
const logger = require("../logger");

class Controller {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const data = await this.service.getAll(req.query);
            this.response(res, data);
        } catch (error) {
            logger.error(error.message);
            this.response(res, error, error.status);
        }
    };

    get = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const users = await this.service.get(req.params.key);
            this.response(res, users);
        } catch (error) {
            logger.error(error.message);
            this.response(res, error, error.status);
        }
    };

    post = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const result = await this.service.post(req.body);
            this.response(res, result);
        } catch (error) {
            logger.error(error.message);
            this.response(res, error, error.status);
        }
    };

    put = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const result = await this.service.put(req.params.key, req.body);
            this.response(res, result);
        } catch (error) {
            logger.error(error.message);
            this.response(res, error, error.status);
        }
    };

    patch = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const result = await this.service.patch(req.params.key, req.body);
            this.response(res, result);
        } catch (error) {
            logger.error(error.message);
            this.response(res, error, error.status);
        }
    };

    delete = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const result = await this.service.delete(req.params.key);
            this.response(res, result);
        } catch (error) {
            logger.error(error.message);
            this.response(res, error, error.status);
        }
    };

    /**
     * This method returns a one time HTTP Response.
     *
     * @returns {null}
     * @name response
     * @param {Object} Res
     * @param {Object} Data
     * @param {Intger} Status
     *
     */
    response(res, data, status = 200) {
        if (status != 200) {
            data = {
                message: data.message,
            };
        }
        res.status(status).json(data);
        return res.end();
    }
}

module.exports = Controller;
