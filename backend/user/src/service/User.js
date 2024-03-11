/**
 * UserService Class
 */

const Service = require("./Service");
const bcrypt = require("bcrypt");
const HTTPNotFound = require("../exceptions/HTTPNotFound");
const HTTPBadRequest = require("../exceptions/HTTPBadRequest");
const HTTPForbidden = require("../exceptions/HTTPForbidden");
const HTTPInternalServerError = require("../exceptions/HTTPInternalServerError");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const User = require('../models/User') // Replace with your actual product model

class UserService extends Service {
    constructor(model) {
        super(model);
    }

    getAll = async (queryParams) => {
        try {
            const {
                filter = [],
                search,
                sort,
                limit = 1,
                offset = 0,
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

            query.attributes = [
                "link",
                "email",
                "contactNo",
                "emailVerified",
                "contactNoVerified",
                "createdAt",
                "updatedAt",
                "deleted",
            ];

            const result = await this.model.findAndCountAll(query);

            if (result.length == 0) throw new HTTPNotFound();

            return result;
        } catch (error) {
            this.handle(error);
        }
    };

    get = async (id) => {
        try {

            const result = await this.findById(id);

            if (!result) throw new HTTPNotFound(`Not Found <${id}>`);

            return result;
        } catch (error) {
            this.handle(error);
        }
    };

    post = async (data) => {
        try {
            if(!data.email){
                throw new HTTPBadRequest("Email is required")
            }

            if(!data.password){
                throw new HTTPBadRequest("Password is required")
            }

            const user = await this.findByEmail(data.email);

            if (user)
                throw new HTTPBadRequest(
                    `User already exist with same email <${data.email}>`
                );

            data.password = await bcrypt.hash(data.password, 10);
            const result = await this.model.create(data);

            if (!result)
                throw new HTTPInternalServerError(
                    `Failed to create user with email <${data.email}>`
                );

            return await this.findByEmail(data.email);
        } catch (error) {
            this.handle(error);
        }
    };

    put = async (data) => {
        throw new HTTPForbidden();
    };

    patch = async (id, data) => {
        try {
            const user = await this.findById(id);

            if (!user) throw new HTTPNotFound(`User not found <${id}>`);

            const result = await this.model.update(
                { ...user, ...data },
                {
                    where: { id: parseInt(id) },
                    returning: true, // Return the updated record
                    plain: true, // Return only the plain JSON object
                }
            );

            if (!result)
                throw new HTTPInternalServerError(
                    `Failed to update user <${id}>`
                );

            return await this.findById(id);
        } catch (error) {
            this.handle(error);
        }
    };

    delete = async (id) => {
        try {
            const user = await this.findById(id);

            if (!user) throw new HTTPBadRequest(`User not found <${id}>`);

            const result = await this.model.update(
                {
                    deleted: true,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );

            if (!result)
                throw new HTTPInternalServerError(
                    `Failed to delete user <${id}>`
                );

            user.deleted = true;

            return user;
        } catch (error) {
            this.handle(error);
        }
    };

    findByEmail = async (email) => {
        const user = await this.model.findOne({
            where: {
                email: email,
            },
            attributes: [
                "link",
                "email",
                "contactNo",
                "emailVerified",
                "contactNoVerified",
                "createdAt",
                "updatedAt",
                "deleted",
            ],
        });

        return user;
    };

    findById = async (id) => {
        const user = await this.model.findOne({
            where: Sequelize.and({ deleted: 0 }, this.codeOrId(id)),
            attributes: [
                "link",
                'id',
                "email",
                "contactNo",
                "firstName",
                "lastName",
                "password",
                "emailVerified",
                "contactNoVerified",
                "createdAt",
                "updatedAt",
                "deleted",
            ],
        });

        return user;
    };

    codeOrId(key) {
        let id = +key
        if (isNaN(+key)) {
            id = 0
        }
        return Sequelize.or({ link: key }, { id: id }, {email:key})
    }
}

module.exports = new UserService(User);
