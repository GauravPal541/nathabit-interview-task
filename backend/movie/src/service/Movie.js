/**
 * UserService Class
 */

const Service = require("./Service");
const bcrypt = require("bcrypt");
const HTTPNotFound = require("../exceptions/HTTPNotFound");
const HTTPBadRequest = require("../exceptions/HTTPBadRequest");
const HTTPForbidden = require("../exceptions/HTTPForbidden");
const Like = require("../models/Like");
const Favourite = require("../models/Favourite");
const HTTPInternalServerError = require("../exceptions/HTTPInternalServerError");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const Movie = require("../models/Movie"); // Replace with your actual product model

class MovieService extends Service {
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
            query.where = { [Op.and]: fullQuery };

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

            let result = await this.model.findAndCountAll(query);

            if (result.count == 0) throw new HTTPNotFound();

            let finalRows = [];

            for (let el of result.rows) {
                if (userId) {
                    const like = await Like.findOne({
                        where: {
                            movieId: parseInt(el.id),
                            userId: parseInt(userId),
                        },
                    });

                    if (like) {
                        el.dataValues.liked = true;
                    } else {
                        el.dataValues.liked = false;
                    }

                    const favourite = await Favourite.findOne({
                        where: {
                            movieId: parseInt(el.id),
                            userId: parseInt(userId),
                        },
                    });

                    if (favourite) {
                        el.dataValues.favourite = true;
                    } else {
                        el.dataValues.favourite = false;
                    }
                } else {
                    el.dataValues.liked = false;
                    el.dataValues.favourite = false;
                }

                const totalLikes = await Like.findAll({
                    where: {
                        movieId: parseInt(el.id),
                    },
                });

                if (totalLikes.length > 0) {
                    el.likes = totalLikes.length;
                }

                finalRows.push(el);
            }
            result.rows = finalRows;

            return result;
        } catch (error) {
            this.handle(error);
        }
    }

    async bulkInsert(data) {
        try {
            if (data.length <= 0) {
                throw new HTTPBadRequest("No data to add");
            }
            const promiseAll = [];

            for (let el of data) {
                promiseAll.push(this.model.create(el));
            }

            const promise = await Promise.allSettled(promiseAll);

            return promise;
        } catch (error) {
            this.handle(error);
        }
    }
}

module.exports = new MovieService(Movie);
