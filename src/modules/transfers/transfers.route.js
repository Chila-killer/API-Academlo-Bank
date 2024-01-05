const express = require('express')

const transfersController = require('./transfers.controller')
const userRouter = express.Router()

userRouter.post('/', transfersController.create)

module.exports = userRouter