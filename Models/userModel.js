const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        require : [true, 'Username is required'],
        unique : true
    },
    email : {
        type : String,
        require : [true, 'Email is required'],
        unique : true
    },
    password : {
        type : String,
        require : [true, 'Password is required'],
        unique : false
    },
    firstName : {
        type : String,
        // require : [true, 'First name is required']
    },
    lastName : {
        type : String,
        // require : [true, 'Lastname is required']
    },
    otp: { 
        type: String,
        require: true
    },
    resetOtp: {
        code: { type: String },
        expiresAt: { type: Date }
    },
})


const userModel = mongoose.model("userSchema", userSchema)
module.exports = userModel