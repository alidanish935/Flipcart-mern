
import {Data} from './constant/product2.js'
import {products} from './constant/product.js'
import Product from './modal/productSchema.js'

const DefaultData= async ()=>{
    try {
    //    await Product.deleteMany({})
        await Product.insertMany(products)
        console.log('data imported successfuly')
    }catch(error){
        console.log('error while inserting default data',error.message)
    }
}
export default DefaultData