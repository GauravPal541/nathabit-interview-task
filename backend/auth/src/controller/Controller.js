/**
 * The Base Controller: All other controllers extends from this controller
 */

class Controller {
    constructor(service) {
        this.service = service;
    }
    /**
     * This method returns a one time HTTP Response.
     *
     * @returns {null}
     * @name response
     * @param {Object} Res
     * @param {Object} Data
     * @param {Intger} Status
     *
     */
    response(res, data, status = 200) {
        if (status != 200) {
            data = {
                message: data.message,
            };
        }
        res.status(status).json(data);
        return res.end();
    }
}

module.exports = Controller;
