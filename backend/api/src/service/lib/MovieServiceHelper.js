const axios = require("axios");
const AxiosHelper = require("./axiosHelper");
const HTTPError = require("../../exceptions/HTTPError");

class MovieServiceHelper extends AxiosHelper {
    constructor(service) {
        super();
        this.movieService = service;
    }

    getAllMovies = async (query) => {
        try {
            return await axios.get(`${this.movieService}/movie`, {
                params:query
            });
        } catch (error) {
            console.log(error)
            this.handle(error);
        }
    };

    getAllFavourite = async (query) => {
        try {
            return await axios.get(`${this.movieService}/favourite`, {
                params:query
            });
        } catch (error) {
            console.log(error)
            this.handle(error);
        }
    };

    markAsFavourite = async (data) => {
        try {
            return await axios.post(`${this.movieService}/favourite`, data);
        } catch (error) {
            console.log(error)
            this.handle(error);
        }
    };

    like = async (data) => {
        try {
            return await axios.post(`${this.movieService}/like`, data);
        } catch (error) {
            console.log(error)
            this.handle(error);
        }
    };
}

module.exports = MovieServiceHelper;
