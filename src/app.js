const express = require('express')
const hpp = require('hpp')
const morgan = require('morgan')
const sanitizer = require('perfect-express-sanitizer')
const helmet = require('helmet')

const router = require('./routes/index')
const AppError = require('./common/errors/appError')

const { envs } = require('./config/environments/environments')
const { enableCors } = require('./config/plugins/cors.plugin')
const { limitRequest } = require('./config/plugins/rate-limit.plugin')
const { globalErrorHandler } = require('./common/errors/error.controller')

const app = express()

const ACCEPTED_ORIGINS = []

const limitRequestMin = 60

const rateLimit = limitRequest(1000, limitRequestMin, `Too many requests from this IP, please try again in ${limitRequestMin} minutes!`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(rateLimit)
app.use(helmet())
app.use(hpp({
    // whitelist: ['paramName']
}))
app.use(
    sanitizer.clean({
        xss: true,
        noSql: true,
        sql: false //dejar esto en false, para que no se bloque el form/data
    })
)

enableCors(app, ACCEPTED_ORIGINS)

if (envs.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1', router)

app.all('*', (req, res, next) => {
    return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
    )
})

app.use(globalErrorHandler)

module.exports = app