const user = require('./User')
const movie = require('./Movie')

const Express = require('express')

const Router = Express.Router()

Router.use(user)
Router.use(movie)

module.exports = Router