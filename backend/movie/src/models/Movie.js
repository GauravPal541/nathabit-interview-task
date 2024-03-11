const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('../sequelize') // Your Sequelize instance

const Movie = sequelize.define('movies', {
    link: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    id:{
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    Poster: {
        type: DataTypes.STRING
    },
    imdbID:{
        type: DataTypes.STRING
    },
    Title: {
        type: DataTypes.STRING,
        unique:true
    },
    likes:{
        type: DataTypes.BIGINT.UNSIGNED,
        defaultValue:0
    },
    Plot: {
        type: DataTypes.STRING,
    },
    Type: {
        type: DataTypes.STRING,
    },
    Year: {
        type: DataTypes.STRING,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
})

module.exports = Movie
