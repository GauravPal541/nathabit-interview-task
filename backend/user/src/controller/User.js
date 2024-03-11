// Example usage in a route or controller
const express = require('express')
const service = require('../service/User')
const Controller = require('./Controller')

class UserController extends Controller {
    constructor(service) {
        super(service)
    }
}

module.exports = new UserController(service)
