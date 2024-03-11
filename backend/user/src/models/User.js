// models/User.js
const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('../sequelize') // Your Sequelize instance

const User = sequelize.define('user', {
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
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactNo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    accessToken: {
        type: DataTypes.STRING
    },
    refreshToken: {
        type: DataTypes.STRING
    },
    recoveryToken: {
        type: DataTypes.STRING
    },
    recoveryTokenTimestamp: {
        type: DataTypes.DATE
    },
    emailVerificationUUID: {
        type: DataTypes.STRING
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    contactNoVerificationOTP: {
        type: DataTypes.STRING,
    },
    contactNoVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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

module.exports = User
