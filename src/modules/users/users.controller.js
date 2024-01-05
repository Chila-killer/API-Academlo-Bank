const AppError = require('../../common/errors/appError')
const UserServices = require('./users.services')
const TransferServices = require('../transfers/transfers.services')

const { validateUser, validateLogin } = require('./users.schema')
const { catchAsync } = require('../../common/errors/catchAsync')
const { verifyPassword } = require('../../config/plugins/encryptedPassword.plugin')
const { generateJWT } = require('../../config/plugins/generateJWT.plugin')
const { generateAccountNumber } = require('./users.middleware')

exports.create = catchAsync(async(req, res) => {
    const { hasError, errorMessages, userData } = validateUser(req.body)
    // const emailUser = await UserServices.validateEmail(userData.email)

    if(hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    // if (emailUser) {
    //     return next(new AppError(`User with email: ${userData.email} already exists`, 409))
    // }

    userData.accountNumber = parseInt(generateAccountNumber())

    const createdUser = await UserServices.create(userData)

    const token = await generateJWT(createdUser.id)

    return res.status(201).json({
        token, 
        user: {
            id: createdUser.id,
            name: createdUser.name,
            accountNumber: createdUser.accountNumber,
            amount: createdUser.amount
        }
    })
})

exports.login = catchAsync(async(req, res) => {
    const { hasError, errorMessages, userData } = validateLogin(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await UserServices.validateAccountNumber(userData.accountNumber)

    if (!user) {
        return next(new AppError('Incorrect credentials', 401))
    }

    const isCorrectPassword = await verifyPassword(
        userData.password,
        user.password
    )

    if (!isCorrectPassword) {
        return next(new AppError('Incorrect credentials', 401))
    }

    const token = await generateJWT(user.id)

    return res.status(202).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
})

exports.findAll = catchAsync(async(req, res) => {
    const currentUserId = req.sessionUser.id

    const transfers = await TransferServices.findAll(currentUserId)

    return res.status(200).json({
        data: transfers
    })
})

