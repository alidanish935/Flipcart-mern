import mongoose from 'mongoose'

const userOtpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const userotp = new mongoose.model('userotp',userOtpSchema)

export default userotp