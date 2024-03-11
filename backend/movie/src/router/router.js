const movie = require('./Movie')
const favourite = require('./Favourite')
const like = require('./Like')
const Express = require('express')

const Router = Express.Router()

Router.use(movie)
Router.use(like)
Router.use(favourite)

module.exports = Router