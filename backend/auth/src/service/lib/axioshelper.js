/**
 * Axios Helper Class
 */
const logger = require('../../logger')
const axios = require('axios')
const config = require('../../config/service.config')
const HTTPError = require('../../exceptions/HTTPError')
const HTTPInternalServerError = require('../../exceptions/HTTPInternalServerError')

class AxiosHelper {
    constructor() {
        // initialize the retry mechanism
        this.max_retries = config.MAX_RETRIES
        this.retry_delay = config.RETRY_DELAY
        this.counter = 0
        
        axios.interceptors.response.use(this.done, this.retry)
    }

    done = async (response) => {
        this.counter = 0
        return Promise.resolve(response)
    }

    retry = async (error) => {
        const config = error.config

        if(error.response) {
            if(this.counter < this.max_retries && error.response.status >= 500) {
                logger.error(`Retry attempt: ${++this.counter} Interval: ${this.retry_delay} URL: ${config.url} `)
                return await new Promise((resolve) => {
                    setTimeout(() => { 
                        resolve(axios(config))
                    }, this.retry_delay)
                })
            }
        }
        
        else if(error.request) {
            if(this.counter < this.max_retries) {
                logger.error(`Retry attempt: ${++this.counter} Interval: ${this.retry_delay} URL: ${config.url} `)
                return await new Promise((resolve) => {
                    setTimeout(() => { 
                        resolve(axios(config))
                    }, this.retry_delay)
                })
            }
        }
        
        this.counter = 0
        return Promise.reject(error)
    }

    handle(err) {
        logger.error(err)
        if (err instanceof HTTPError) {
            throw err
        }
        else if (err.response) {
            throw new HTTPError(err.response.status,
                err.response.data.message)
        }
        else if (err.request) {
            throw new HTTPInternalServerError("Error in " + err.config.url)
        }
        else {
            throw new HTTPInternalServerError(err)
        }
    }
}

module.exports = AxiosHelper