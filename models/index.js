const { error } = require('console');
const sequelize = require('../config/db_utils');
const users = require('./users');
const tokens = require('./tokens');

// 데이터베이스 동기화
sequelize.sync({alter: true})
    .then(() => console.log('Database & tables created!'))
    .catch((error) => console.error(error));

module.exports = { sequelize, users, tokens };