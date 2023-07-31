import mongoose from "mongoose";

const cartShema = new mongoose.Schema({
    id:{type:String,required:true,unique:false},
    url:String,
    customer_id:{type:String},
    detailUrl:String,
    title:Object,
    price:Object,
    quantity:Number,
    description:String,
    discount:String,
    tagline:String
})

const cart = mongoose.model('cart',cartShema)

export default cart