const dbConfig = require("./config/service.config")
const Sequelize = require("sequelize")
const logger = require('./logger')

/**
 * Initialise the sequelise
 */
const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASS, {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.DB_DIALECT,
    operatorsAliases: false,
    pool: {
        max: dbConfig.POOL_MAX,
        min: dbConfig.POOL_MIN,
        acquire: dbConfig.POOL_ACQUIRE,
        idle: dbConfig.POOL_IDLE,
    },
})

sequelize.authenticate()
    .then((resolve)=>{
        logger.info('Connected to database')
    })
    .catch((reject)=>{
        logger.error('Database connection failed.')
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db