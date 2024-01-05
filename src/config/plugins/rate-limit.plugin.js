const rateLimit = require('express-rate-limit')

exports.limitRequest = (maxRequest, windowsMinutes, message) => {
    return rateLimit({
        max: maxRequest,
        windowsMs: windowsMinutes,
        message: message
    })
}