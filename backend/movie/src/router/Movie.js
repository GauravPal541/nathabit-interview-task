/**
 * This File Serves As The routes definition for
 * managing demo routes on various resource.
 */

const MovieController = require('../controller/Movie');
const Express = require('express');
const Router = Express.Router();

const { failIfLimitAndOffsetAreInvalid, validate } = require('../validator');

/* List all routes here*/
/* List all user routes here*/
Router.get('/movie',
            [failIfLimitAndOffsetAreInvalid, validate], // validation middleware
            MovieController.getAll) // Controller function

Router.get('/movie/:link', MovieController.get)
Router.post('/movie', MovieController.post)
Router.post('/movie/bulk', MovieController.bulkInsert)
Router.put('/movie/:link', MovieController.put)
Router.patch('/movie/:link', MovieController.patch)
Router.delete('/movie/:link', MovieController.delete)

module.exports = Router;
