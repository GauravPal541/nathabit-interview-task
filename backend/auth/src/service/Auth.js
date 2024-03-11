/**
 * AuthService Class
 */

const UserServiceHelper = require("./lib/userhelper");
const config = require("../config/service.config");
const bcrypt = require("bcrypt");
const HTTPError = require("../exceptions/HTTPError");
const HTTPBadRequest = require("../exceptions/HTTPBadRequest");
const HTTPNoContent = require("../exceptions/HTTPNoContent");
const HTTPUnauthorized = require("../exceptions/HTTPUnauthorized");
const jwt = require("jsonwebtoken");
const HTTPForbidden = require("../exceptions/HTTPForbidden");

class AdminAuthService {
    constructor() {
        this.userService = new UserServiceHelper(config.USER_SERVICE);
    }

    authenticate = async (req, res) => {
        try {
            const method = req.headers["x-original-method"];
            const optionsRequested = method.toLowerCase() == "options";

            const methodRequested =
                req.headers["access-control-request-method"];
            const headersRequested =
                req.headers["access-control-request-headers"];

            // Set CORS in all response
            res.set("Access-Control-Allow-Origin", "*");

            // Handle browser's pre-flight
            if (optionsRequested && methodRequested && headersRequested) {
                res.set(
                    "Access-Control-Allow-Methods",
                    "OPTIONS, GET, HEAD, POST, PUT, PATCH, DELETE"
                );
                res.set(
                    "Access-Control-Allow-Headers",
                    "Accept, Content-Type, Origin, Referer, ott, otp, at"
                );
                res.set("Access-Control-Expose-Headers", "ott");
                throw new HTTPNoContent();
            }

            const accessToken = req.headers.at || "";

            if (!accessToken.trim()) {
                throw new HTTPBadRequest("Invalid request headers");
            }

            let payload = {};

            try {
                const signingKey = config.JWT_SECRET;
                payload = jwt.verify(accessToken, signingKey);
            } catch (err) {
                throw new HTTPUnauthorized("Invalid or expired access token");
            }

            if (payload && Object.keys(payload).length) {
                return payload;
            }

            throw HTTPForbidden("Access denied");
        } catch (err) {
            throw err;
        }
    };

    signup = async (req) => {
        try {
            return await this.userService.addUser(req.body);
        } catch (err) {
            throw err;
        }
    };

    setup = async (req) => {
        try {
            return await this.userService.getAllAdmin(req.body);
        } catch (err) {
            throw err;
        }
    };

    login = async (req) => {
        try {
            let result = await this.userService.getUser(req.body.email);
            console.log("User result", result)
            
            const passwordMatch = await bcrypt.compare(
                req.body.password,
                result.password
            );

            if (!passwordMatch) {
                throw new HTTPError(401, "Wrong Credentials");
            }

            // Create and sign a JWT token
            const accessToken = jwt.sign(
                { email: result.email, id: result.id },
                config.JWT_SECRET,
                { expiresIn: "1h" }
            );

            const refreshToken = jwt.sign(
                { email: result.email, id: result.id },
                config.JWT_SECRET,
                { expiresIn: "24h" }
            );

            return {
                userInfo: {
                    name: `${result.firstName} ${result.lastName}`,
                    userId:result.id
                },
                accessToken,
                refreshToken,
            };
        } catch (err) {
            this.userService.handle(err);
        }
    };

    validate = async (req) => {
        try {
            return { validate: 200 };
        } catch (err) {
            throw err;
        }
    };

    refresh = async (req) => {
        try {
            return { refresh: 200 };
        } catch (err) {
            throw err;
        }
    };
}

module.exports = new AdminAuthService();
