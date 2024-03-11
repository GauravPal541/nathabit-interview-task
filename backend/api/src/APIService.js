
const Service = require('./Service');
const config = require('./config/service.config');
const cors =require('cors');

const routes = require('./router/router');

class AuthService extends Service {
    constructor(name) {
        super(name);

        this.App.use(cors({
            origin: '*'
        }));
        
        this.initRoutes();
    }

    initRoutes() {
        /* Load the middleware */
        this.App.use(config.SERVICE_BASE, routes);
    }

    start() {
        //start express service here
        super.start();
    }
}

module.exports = new AuthService(config.SERVICE_NAME);
