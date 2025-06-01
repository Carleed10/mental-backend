const express = require('express')
const { signUp, login, deleteAccount, forgotPassword, verifyOtp} = require('../Controllers/userController')
const { validateUser, validateSchema, validateLoginSchema } = require('../Middleware/validator')
const verifyToken = require('../Middleware/verifyToken')

const userRouter = express.Router()

userRouter.post('/signUp', validateUser(validateSchema), signUp)
// userRouter.get('/signup',    signUp)

userRouter.post('/login', validateUser(validateLoginSchema), login)
// userRouter.post('/editPassword', editPassword)
userRouter.post('/forgotPassword', forgotPassword)
userRouter.post('/verifyOtp', verifyOtp)
userRouter.post('/deleteAccount', verifyToken, deleteAccount)

// userRouter.post('/verifyOtp', verifyOtp)





module.exports = userRouter