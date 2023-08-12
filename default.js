
import {products} from './constant/product.js'
import { clothData } from './constant/clothsProduct.js'
import Product from './modal/productSchema.js'
import ProductCloth from './modal/clothSchema.js'

export const DefaultData= async ()=>{
    try {
    //    await Product.deleteMany({})
        await Product.insertMany(products)
        console.log('data imported successfuly')
    }catch(error){
        console.log('error while inserting default data',error.message)
    }
}

export const DefaultClothData =async()=>{
    try {
           await ProductCloth.deleteMany({})
            await ProductCloth.insertMany(clothData)
            console.log('data imported successfuly')
        }catch(error){
            console.log('error while inserting default data',error.message)
        }
}