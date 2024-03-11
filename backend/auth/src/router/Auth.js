/**
 * This File Serves As The routes definition for
 * managing demo routes on various resource.
 */

const AdminAuthController = require('../controller/Auth');
const Express = require('express');

const Router = Express.Router();

/**
 * This route authenticates the 
 * access token and checks if the caller 
 * has permisisons.
 */
Router.get('/user/authenticate', AdminAuthController.authenticate);

/**
 * This route creates a new user
 */
Router.post('/user/register', AdminAuthController.signup);


/**
 * This route checks the credentials and 
 * issues an access token and a refresh token
 */


/**
 * This route checks the credentials and 
 * issues an access token and a refresh token
 */


Router.post('/user/login', AdminAuthController.login);

/**
 * This route checks the access token and refresh token
 * in the request and responds 200 if token is valid.
 * 
 * Responds 401 if token has expired. 
 */
Router.get('/user/validate', AdminAuthController.validate);

/**
 * This route returns the new access token given a 
 * valid refresh token. 
 * 
 * Returns 401 if the refresh token is also expired.
 */
Router.get('/user/refresh', AdminAuthController.refresh);

module.exports = Router;
