const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_utils');

const tokens = sequelize.define('tokens', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        foreignKey: 'user_id',
    },
    device_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE
    }
},{
    tableName: 'tokens',
    timestamps: false,
});

module.exports = tokens;