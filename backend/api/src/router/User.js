/**
 * This File Serves As The routes definition for
 * managing demo routes on various resource.
 */

const UserController = require('../controller/User');
const Express = require('express');

const Router = Express.Router();

/* List all routes here*/
Router.get('/user/:key', UserController.get);
Router.patch('/user/:key', UserController.patch);


module.exports = Router;
