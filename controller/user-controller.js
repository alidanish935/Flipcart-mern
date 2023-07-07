import User from '../modal/userSchema.js'

export const userSignUp = async (request,response) =>{
    try {
        const exist = await User.findOne({ username: request.body.username });
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