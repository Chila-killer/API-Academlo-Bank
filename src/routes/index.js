const express = require('express')
const userRouter = require('../modules/users/users.route')
const transferRouter = require('../modules/transfers/transfers.route')
const { protect } = require('../common/middlewares/middlewares')

const router = express.Router()

router.use('/users', userRouter)
router.use(protect)
router.use('/transfers', transferRouter)

module.exports = router