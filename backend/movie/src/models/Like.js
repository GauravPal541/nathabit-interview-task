const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('../sequelize') // Your Sequelize instance

const Like = sequelize.define('likes', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Like