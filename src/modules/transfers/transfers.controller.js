const AppError = require('../../common/errors/appError')
const TransferServices = require('./transfers.services')
const UserServices = require('../users/users.services')
const { catchAsync } = require('../../common/errors/catchAsync')
const { validateTransfer } = require('./transfers.schema')

exports.create = catchAsync(async(req, res, next) => {
    const currentUser = req.sessionUser
    const { hasError, errorMessages, transferData } = validateTransfer(req.body)

    if (hasError) {
        return res,status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await UserServices.findOne(transferData.receiverUserId)

    if(!user) {
        return next(new AppError(`The account receiver with id: ${transferData.receiverUserId} does not exist`, 404))
    }

    if(transferData.amount > currentUser.amount) {
        return next(new AppError(`Insufficient funds`, 409))
    }

    transferData.senderUserId = currentUser.id
  
    const createdTransfer = await TransferServices.create(transferData)

    const newSenderAmount = {
        amount: parseInt(currentUser.amount) - transferData.amount
    }

    const newReceiverAmount = {
        amount: parseInt(user.amount) + transferData.amount
    }

    await UserServices.updateAmount(currentUser, newSenderAmount)
    await UserServices.updateAmount(user, newReceiverAmount)

    return res.status(202).json({
        data: createdTransfer
    })
})