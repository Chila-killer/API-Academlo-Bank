const { envs } = require('../../config/environments/environments')
const AppError = require('./appError')
const Error = require('./error.model')

const handleCastError23505 = () => new AppError('Duplicate value: please enter another value', 400)

const handleCastError22P02 = () =>
    new AppError('Invalid data type in database', 400)

const handleJWTExpiredError = () =>
    new AppError('Your token has expired! Please login again', 401)

const handleJWTError = () =>
    new AppError('Invalid Token! Please login again', 401)

const sendErrorDev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err
    })
}

const sendErrorProd = async (err, res) => {
    await Error.create({
        status: err.status,
        message: err.message,
        stack: err.stack
    })

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        console.log('ERROR 💣: ', err);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went wrong!'
        })
    }
}

exports.globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'fail'

    if (envs.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
    if (envs.NODE_ENV === 'production') {
        let error = err

        if (err.parent?.code === '23505') error = handleCastError23505()
        if (err.parent?.code === '22P02') error = handleCastError22P02()
        if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()
        if (err.name === 'JsonWebTokenError') error = handleJWTError()

        sendErrorProd(error, res)
    }
}