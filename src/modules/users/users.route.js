const express = require('express')
const { protect } = require('../../common/middlewares/middlewares')

const usersController = require('./users.controller')
const userRouter = express.Router()

userRouter.post('/signup', usersController.create)
userRouter.post('/login', usersController.login)

userRouter.use(protect)

userRouter.get('/history', usersController.findAll)

module.exports = userRouter