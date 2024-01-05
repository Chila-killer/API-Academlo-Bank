const Transfer = require('./transfers.model')

class TransferServices {
    static async create(data) {
        return await Transfer.create(data)
    }

    static async findAll(senderUserId) {
        return await Transfer.findAll({
            where: {
                senderUserId
            }
        })
    }
}

module.exports = TransferServices