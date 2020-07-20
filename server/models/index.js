const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.options);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
