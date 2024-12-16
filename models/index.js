const { error } = require('console');
const sequelize = require('../config/db_utils');
const users = require('./users');

// 데이터베이스 동기화
sequelize.sync()
    .then(() => console.log('Database & tables created!'))
    .catch((error) => console.error(error));

module.exports = { sequelize, users };