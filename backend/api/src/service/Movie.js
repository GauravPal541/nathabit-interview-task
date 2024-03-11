const MovieServiceHelper = require("./lib/MovieServiceHelper");
const config = require("../config/service.config");
const HTTPError = require("../exceptions/HTTPError");

class MovieService {
    constructor() {
        this.movieServiceHelper = new MovieServiceHelper(config.MOVIE_SERVICE);
    }

    getAllMovies = async (req) => {
        try {
            const data = await this.movieServiceHelper.getAllMovies(req.query);
            return data.data;
        } catch (error) {
            console.log(error)
            throw error
        }
    };

    markAsFavourite = async (req) => {
        try {
            const data = await this.movieServiceHelper.markAsFavourite(req.body);
            console.log(data);
            return data.data;
        } catch (error) {
            console.log(error)
            throw error

        }
    };

    getAllFavourite = async (req) => {
        try {
            const data = await this.movieServiceHelper.getAllFavourite(req.query);
            console.log(data);
            return data.data;
        } catch (error) {
            console.log(error)
            throw error

        }
    };

    like = async (req) => {
        try {
            const data = await this.movieServiceHelper.like(req.body);
            console.log(data);
            return data.data;
        } catch (error) {
            console.log(error)
            throw error

        }
    };
}

module.exports = new MovieService();
