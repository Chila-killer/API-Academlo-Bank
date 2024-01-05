const jwt = require('jsonwebtoken')
const { envs } = require("../../config/environments/environments")
const UsersServices = require("../../modules/users/users.services")
const AppError = require("../errors/appError")
const { catchAsync } = require("../errors/catchAsync")
const { promisify } = require('util')

const protect = catchAsync(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new AppError('You are not logged in!. Please login to get access', 401))
    }

    const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED)

    const user = await UsersServices.findOne(decoded.id)

    if (!user) {
        return next(
            new AppError('The owner of this token is not longer available', 401)
        )
    }

    if (user.passwordChangedAt) {
        const changedTimeStamp = parseInt
            (
                user.passwordChangedAt.getTime() / 1000,
                10
            )

        if (decoded.iat < changedTimeStamp) {
            return next(
                new AppError('User recently changed password!, please login again.', 401)
            )
        }
    }

    req.sessionUser = user
    next()
})

module.exports = {
    protect
}