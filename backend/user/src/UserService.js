
const Service = require('./Service');
const config = require('./config/service.config');
const db = require('./sequelize');
const models = require('./models/models');

//add admin routes
const routes = require('./router/router');

class UserService extends Service {
    constructor(name) {
        super(name);
        this.initRoutes();
    }

    initRoutes() {
        /* Load the middleware */
        this.App.use(config.SERVICE_BASE, routes);
    }

    async start() {
        //start express service here
        //await db.sequelize.sync({force: true});
        await db.sequelize.sync();
        super.start();
        //start rmq client service here if needed
    }
}

module.exports = new UserService(config.SERVICE_NAME);
