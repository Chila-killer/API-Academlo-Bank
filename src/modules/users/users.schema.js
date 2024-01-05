const z = require('zod')
const { extractValidationData } = require('../../common/utils/extractErrorData')

const registerSchema = z.object({
    name: z.string({invalid_type_error: 'name must be a string', required_error: 'name is required'})
    .min(3, { message: 'name is too short' })
    .max(50, { message: 'name is too long' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters'}),
})

const loginSchema = z.object({
  accountNumber: z.number({invalid_type_error: 'account number must be a number', required_error: 'account number is required'}),
  password: z.string().min(8, { message: 'Password must be at least 8 characters'}),
})

const validateUser = (data) => {
    const result = registerSchema.safeParse(data)
  
    const {
      hasError,
      errorMessages,
      data: userData
    } = extractValidationData(result)

    return {
      hasError,
      errorMessages,
      userData,
    }
}

const validateLogin = (data) => {
    const result = loginSchema.safeParse(data)
  
    const {
      hasError,
      errorMessages,
      data: userData
    } = extractValidationData(result)

    return {
      hasError,
      errorMessages,
      userData,
    }
}

module.exports = {
    validateUser,
    validateLogin
}