const z = require('zod')
const { extractValidationData } = require('../../common/utils/extractErrorData')

const registerSchema = z.object({
    amount: z.number({invalid_type_error: 'amount must be a number', required_error: 'amount is required'}).int().min(1),
    receiverUserId: z.number({invalid_type_error: 'receiver Id must be a number', required_error: 'receiver Id is required'}).int(),
})

const validateTransfer = (data) => {
    const result = registerSchema.safeParse(data)
  
    const {
      hasError,
      errorMessages,
      data: transferData
    } = extractValidationData(result)

    return {
      hasError,
      errorMessages,
      transferData,
    }
}

module.exports = {
    validateTransfer,
}