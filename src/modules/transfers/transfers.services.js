const Transfer = require('./transfers.model')
const { Op } = require("sequelize");

class TransferServices {
    static async create(data) {
        return await Transfer.create(data)
    }

    static async findAll(id) {
        return await Transfer.findAll({
            where: {
                [Op.or]: [
                    { senderUserId: id },
                    { receiverUserId: id }
                  ]
            }
        })
    }
}

module.exports = TransferServices