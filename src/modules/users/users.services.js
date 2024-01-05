const User = require("./users.model");

class UserServices {
    static async create(data) {
        return await User.create(data)
    }

    static async validateAccountNumber(accountNumber) {
        return await User.findOne({
            where: {
                accountNumber
            }
        })
    }

    static async findOne(id) {
        return await User.findOne({
            where: {
                id
            }
        })
    }

    static async updateAmount(user, data) {
        return await user.update(data)
    }
}

module.exports = UserServices