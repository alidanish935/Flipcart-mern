import User from '../modal/userSchema.js'
import nodemailer from 'nodemailer'
import userotp from '../modal/otpSchema.js'

const tarnsporter = nodemailer.createTransport({
    service:"gmail",
    
    auth:{
        user:'alidanish935@gmail.com',
        pass:'wyxwdukwlzlfulvm'
    }
})


export const userSignUp = async (request,response) =>{
    try {
        const exist = await User.findOne({ username: request.body.username,email:request.body.email });
        if(exist) {
            return response.status(401).json({ message: 'User already exist'});
        }
        const user = request.body;
        const newUser = new User(user);
       await newUser.save();
        response.status(200).json({ message: user });
        
    } catch (error) {
        response.status(500).json({ message: error.message });  
    }
}
export const userLogin = async(request,response)=>{
    try{
        const user = await User.findOne({username:request.body.username , password:request.body.password})
        if(user){
            return response.status(200).json(`${request.body.username} login Successfully`)
        }else{
            return response.status(401).json('Invalid User')
        }
    }catch(error){
            return response.status(500).json({message:error.message})
    }
}
export const userVerifyCont = async(req,res)=>{
    const f_data = req.body
    const user_Otp = f_data.otp
    console.log('user_Otp --- ',f_data)
    try{
        const data = await userotp.findOne({email:req.body.email})
        const user_data = await User.findOne({email:req.body.email})
        console.log('user_data --- ',user_data)
        
        const db_Otp = data.otp
        console.log('db_Otp --- ',db_Otp)
        
        if(db_Otp === user_Otp){
            res.status(200).json({message:"login succussfully",username:user_data.username})
        }else{
           res.status(400).json({error:"Invalid Otp"})

        }
    }catch(error){
        res.status(500).json({error:'Invalid Otp'})
    }
}
// export const finduserCont =async(req,res)=>{
//     console.log('req in finduserCont-------',req.body)
//     try{
//         const data = await User.findOne({email:req.body.email})
//         console.log('data --- ',data)
//         res.status(200).json(data)
//     }catch(error){
//         res.status(500).json({error:error.message})
//     }
// }
export const userOtpSend = async(req,res)=>{
    const email = req.body.email
    try{
        const preUser =  await User.findOne({email:req.body.email})
        console.log('preUser --- ',preUser)
        if(preUser){
            const OTP = Math.floor( Math.random()*900000)
            const existEmail = await userotp.findOne({email:req.body.email})
            if(existEmail){
                const updateUserOtp = await userotp.findByIdAndUpdate({_id:existEmail._id},{otp:OTP},{new:true})
                console.log('updateUserOtp - ',updateUserOtp)
                await updateUserOtp.save()
                const mailOptions = {
                    from:'alidanish935@gmail.com',
                    to:email,
                    subject:"Sending Email for OTP Validation  ",
                    text:`OTP from flipcart Danish - ${OTP}`
                  
                }
                tarnsporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log('error ',error)
                        res.status(400).json({error:'email not send'})
                    }else{
                        console.log('email sent ',info.response)
                        res.status(200).json({message:'email sent successfully'})
                    }
                })
            }else{
                const saveOtpData = new userotp({
                    email,otp:OTP
                })
                await saveOtpData.save()
                const mailOptions = {
                    from:'alidanish935@gmail.comL',
                    to:email,
                    subject:"Sending Email for OTP Validation",
                    text:`OTP from flipcart Danish - ${OTP}`
                   

                }
                tarnsporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log('error ',error)
                        res.status(400).json({error:'email not send'})
                    }else{
                        console.log('email sent ',info.response)
                        res.status(200).json({message:'email sent successfully'})
                    }
                })
            }
        }else{
           return res.status(400).json({error:"This User not exist in db"})
        }

    }catch(error){
        res.status(500).json({error:error.message})
    }
}