const Service = require("./Service");
const config = require("./config/service.config");
const cors = require("cors");

//add authentication routes
const routes = require("./router/router");

class AuthService extends Service {
    constructor(name) {
        super(name);
        this.initRoutes();
    }

    initRoutes() {
        /* Load the middleware */
        this.App.use(
            cors({
                origin: "*",
                allowedHeaders: "*",
                exposedHeaders: "*",
                methods: "*",
            })
        );
        this.App.use(config.SERVICE_BASE, routes);
    }

    start() {
        //start express service here
        super.start();
        //start rmq client service here if needed
    }
}

module.exports = new AuthService(config.SERVICE_NAME);
