/**
 * This File Serves As The routes definition for
 * managing demo routes on various resource.
 */

const FavouriteController = require('../controller/Favourite');
const Express = require('express');
const Router = Express.Router();

const { failIfLimitAndOffsetAreInvalid, validate } = require('../validator');

/* List all routes here*/
/* List all user routes here*/
Router.get('/favourite',
            [failIfLimitAndOffsetAreInvalid, validate], // validation middleware
            FavouriteController.getAll) // Controller function

Router.get('/favourite/:id', FavouriteController.get)
Router.post('/favourite', FavouriteController.post)
Router.put('/favourite/:id', FavouriteController.put)
Router.patch('/favourite/:id', FavouriteController.patch)
Router.delete('/favourite/:id', FavouriteController.delete)

module.exports = Router;
