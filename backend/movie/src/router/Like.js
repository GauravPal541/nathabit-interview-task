/**
 * This File Serves As The routes definition for
 * managing demo routes on various resource.
 */

const LikeController = require('../controller/Like');
const Express = require('express');
const Router = Express.Router();

const { failIfLimitAndOffsetAreInvalid, validate } = require('../validator');

/* List all routes here*/
/* List all user routes here*/
Router.get('/like',
            [failIfLimitAndOffsetAreInvalid, validate], // validation middleware
            LikeController.getAll) // Controller function

Router.get('/like/:id', LikeController.get)
Router.post('/like', LikeController.post)
Router.put('/like/:id', LikeController.put)
Router.patch('/like/:id', LikeController.patch)
Router.delete('/like/:id', LikeController.delete)

module.exports = Router;
