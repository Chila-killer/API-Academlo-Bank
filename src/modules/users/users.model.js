const { DataTypes } = require('sequelize')
const { sequelize } = require('../../config/database/database')
const { encryptedPassword } = require('../../config/plugins/encryptedPassword.plugin')

const User = sequelize.define('users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    accountNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'account_number'
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    amount: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 1000
    },

    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
    }
}, {
    hooks: {
        beforeCreate: async(user) => {
            user.password = await encryptedPassword(user.password)
        }
    }
})

module.exports = User