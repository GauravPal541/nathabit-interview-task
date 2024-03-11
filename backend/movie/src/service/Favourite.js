/**
 * UserService Class
 */

const Service = require("./Service");
const bcrypt = require("bcrypt");
const HTTPNotFound = require("../exceptions/HTTPNotFound");
const HTTPBadRequest = require("../exceptions/HTTPBadRequest");
const HTTPForbidden = require("../exceptions/HTTPForbidden");
const HTTPInternalServerError = require("../exceptions/HTTPInternalServerError");
const Movie = require("../models/Movie");
const Like = require("../models/Like");

const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const Favourite = require("../models/Favourite");

class FavouriteService extends Service {
    constructor(model) {
        super(model);
        this.model = model;
    }

    async getAll(queryParams) {
        try {
            const {
                filter = [],
                search,
                sort,
                limit,
                offset = 0,
                userId,
            } = queryParams;
            const attributes = this.model.getAttributes();
            const searchableColumns = [],
                dateTimeColumns = [];

            for (const [key, value] of Object.entries(attributes)) {
                if (
                    value.type instanceof Sequelize.DATE ||
                    value.type instanceof Sequelize.BOOLEAN
                ) {
                    dateTimeColumns.push(key);
                    continue;
                }
                searchableColumns.push(key);
            }

            filter.deleted = filter.deleted ?? false;
            const fullQuery = filter;

            if (search) {
                const searchQuery = [];
                searchableColumns.forEach((column) => {
                    searchQuery.push({
                        [column]: { [Op.like]: `%${search}%` },
                    });
                });
                fullQuery.push({
                    [Op.or]: searchQuery,
                });
            }

            const query = {};
            query.where = { [Op.and]: fullQuery, userId };

            // Apply filtering
            if (filter) {
                //query.where = filter
            }

            // Apply searching
            if (search) {
                query.where = { [Op.and]: fullQuery };
            }

            // Apply sorting
            if (sort) {
                query.order = [sort.split(",")];
            }

            // Apply pagination
            if (limit) {
                query.limit = parseInt(limit);
                query.offset = parseInt(offset);
            }

            query.attributes = {
                exclude: ["id"],
            };
            let result = await this.model.findAndCountAll(query);

            if (result.count == 0) throw new HTTPNotFound();

            let resultedMovies = [];

            for (let el of result.rows) {
                let data = await Movie.findOne({
                    where: {
                        id: parseInt(el.movieId),
                    },
                });

                const like = await Like.findOne({
                    where: {
                        movieId: parseInt(el.movieId),
                        userId: parseInt(userId),
                    },
                });

                if (like) {
                    data.dataValues.liked = true;
                } else {
                    data.dataValues.liked = false;
                }


                const totalLikes = await Like.findAll({
                    where: {
                        movieId: parseInt(el.movieId),
                    },
                });

                data.likes = totalLikes.length;
                resultedMovies.push(data);
            }

            result.rows = resultedMovies;

            return result;
        } catch (error) {
            this.handle(error);
        }
    }
}

module.exports = new FavouriteService(Favourite);
