const { DataTypes } = require('sequelize')
const { sequelize } = require('../../config/database/database')

const Transfer = sequelize.define('transfers', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },

    amount: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },

    senderUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sender_user_id'
    },

    receiverUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'receiver_user_id'
    }
})

module.exports = Transfer