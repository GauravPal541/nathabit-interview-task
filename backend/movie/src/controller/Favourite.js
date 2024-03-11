// Example usage in a route or controller
const express = require('express')
const service = require('../service/Favourite')
const Controller = require('./Controller')
const logger = require('../logger')

class FavouriteController extends Controller {
    constructor(service) {
        super(service)
    }
}

module.exports = new FavouriteController(service)
