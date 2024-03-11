const service = require('../service/Auth');
const Controller = require('./Controller');
const logger = require('../logger');


class AdminAuthController extends Controller {
    constructor(service) {
        super(service);
    }

    authenticate = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const data = await service.authenticate(req, res);
            this.response(res, data);
        } catch (err) {
            logger.error(err.message);
            this.response(res, err, err.status);
        }
    };

    signup = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const data = await service.signup(req);
            this.response(res, data);
        } catch (err) {
            logger.error(err.message);
            this.response(res, err, err.status);
        }
    };

    setup = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);

        try {
            const data = await service.setup(req);
            this.response(res, data);
        } catch (err) {
            logger.error(err.message);
            this.response(res, err, err.status);
        }
    };

    login = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);
        
        try {

            const data = await service.login(req)
            super.response(res, data)
        }
        catch (err) {
            logger.error(err.message);
            super.response(res, err, err.status)
        }
    }

    validate = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);
        
        try {
            const data = await service.validate(req)
            super.response(res, data)
        }
        catch (err) {
            logger.error(err.message);
            super.response(res, err, err.status)
        }
    }

    refresh = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`);
        
        try {
            const data = await service.refresh(req)
            super.response(res, data)
        }
        catch (err) {
            logger.error(err.message);
            super.response(res, err, err.status)
        }
    }

}

module.exports = new AdminAuthController(service);
