const { DataTypes } = require('sequelize')
const { sequelize } = require('../../config/database/database')

const Error = sequelize.define('errors', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },

    status: {
        allowNull: true,
        type: DataTypes.STRING(10)
    },

    message: {
        allowNull: true,
        type: DataTypes.TEXT             
    },

    stack: {
        allowNull: true,
        type: DataTypes .TEXT    
    }
})

module.exports = Error