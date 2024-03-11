const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('../sequelize') // Your Sequelize instance

const Favourite = sequelize.define('favourites', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Favourite