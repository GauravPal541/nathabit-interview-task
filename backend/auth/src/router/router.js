const user = require('./Auth')

const Express = require('express')

const Router = Express.Router()

Router.use(user)

module.exports = Router