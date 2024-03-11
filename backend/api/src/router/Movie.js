/**
 * This File Serves As The routes definition for
 * managing demo routes on various resource.
 */

const MovieController = require('../controller/Movie');
const Express = require('express');

const Router = Express.Router();

/* List all routes here*/
Router.get('/movie', MovieController.getAllMovies);
Router.get('/favourite', MovieController.getAllFavourite);
Router.post('/movie/favourite', MovieController.markAsFavourite);
Router.post('/movie/like', MovieController.like);


module.exports = Router;
