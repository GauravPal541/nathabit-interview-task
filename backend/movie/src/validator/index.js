/**
 * Validation middleware functions
 */

const { check, validationResult } = require('express-validator')

module.exports = {
    failIfLimitAndOffsetAreInvalid: [
        check('limit')
            .trim()
            .optional()
            .isInt({ min: 1, max: 50 })
            .withMessage('limit: invalid value'),
        check('offset')
            .trim()
            .optional()
            .isInt({ min: 0, max: 50 })
            .withMessage('offset: invalid value')
    ],
    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        const extractedErrors = [];

        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
        const Response = { message: 'Bad Request', error: extractedErrors }

        /* Send Back An HTTP Response */
        res.status(400)['json'](Response)
        res.end();
    }
}