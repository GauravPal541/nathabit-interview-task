/**
 * This File Serves As The routes definition for
 * managing demo routes on various resource.
 */

const UserController = require('../controller/User');
const Express = require('express');
const Router = Express.Router();

const { failIfLimitAndOffsetAreInvalid, validate } = require('../validator');

/* List all routes here*/
/* List all user routes here*/
Router.get('/user',
            [failIfLimitAndOffsetAreInvalid, validate], // validation middleware
            UserController.getAll) // Controller function

Router.get('/user/:key', UserController.get)
Router.post('/user', UserController.post)
Router.put('/user/:key', UserController.put)
Router.patch('/user/:key', UserController.patch)
Router.delete('/user/:key', UserController.delete)

module.exports = Router;
