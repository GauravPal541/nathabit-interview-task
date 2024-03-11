/**
 * Axios Helper Class
 */
const logger = require('../../logger')
const HTTPError = require('../../exceptions/HTTPError')
const HTTPInternalServerError = require('../../exceptions/HTTPInternalServerError')

class AxiosHelper {
    constructor() {}

    handle(err) {
        if (err instanceof HTTPError) {
            throw err
        } else if (err.response) {
            throw new HTTPError(err.response.status, err.response.data.message)
        } else if (err.request) {
            throw new HTTPInternalServerError('error in ' + err.config.url)
        } else {
            throw new HTTPInternalServerError(err)
        }
    }
}

module.exports = AxiosHelper
