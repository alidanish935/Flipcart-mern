import mongoose from "mongoose"

const clothSchema = new mongoose.Schema({
    id:{type:String,required:true},
    url:String,
    detailUrl:String,
    title:Object,
    price:Object,
    quantity:Number,
    description:String,
    filter:String,
    img3:String,
    img4:String,
    visible:Boolean,
    category:String,
    size:Array,
    discount:String,
    tagline:String
})

const ProductCloth  = mongoose.model('cloth', clothSchema)

export default ProductCloth