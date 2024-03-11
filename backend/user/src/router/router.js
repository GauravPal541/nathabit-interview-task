const user = require('./User')

const Express = require('express')

const Router = Express.Router()

Router.use(user)

module.exports = Router