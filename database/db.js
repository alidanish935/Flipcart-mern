import mongoose from 'mongoose';

 const Connection = (username,password)=>{
    const ur = process.env.MONGO_URL
    // console.log('username - ',username, 'pass -> ',password)
    const URL =`mongodb+srv://${username}:${password}@cluster0.qphkqzh.mongodb.net/?retryWrites=true&w=majority`
    // const URL =`mongodb+srv://${username}:${password}@cluster0.qphkqzh.mongodb.net/?retryWrites=true&w=majority`
    const url = 'mongodb://localhost:27017/playground'
    try {//
       mongoose.connect(ur,{ useUnifiedTopology:true, useNewUrlParser:true})//
        
        .then(() => console.log('mongodbCloud connected.....'))
    .catch((err) => console.log('error occured while connecting mongodb...', err))
    } catch(error) {
        console.log(`Error while connecting with db `,error.messege)
    }
}

export default Connection