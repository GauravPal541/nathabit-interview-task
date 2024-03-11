// Example usage in a route or controller
const express = require('express')
const service = require('../service/Like')
const Controller = require('./Controller')
const logger = require('../logger')

class LikeController extends Controller {
    constructor(service) {
        super(service)
    }
}

module.exports = new LikeController(service)
