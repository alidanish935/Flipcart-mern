import Product from "../modal/productSchema.js"


export const getProducts= async(request,response)=>{
   try{
        const products = await Product.find({});
        return response.status(200).json(products)
    } catch(error){
        return response.status(500).json({message:error.message})
    }

}

export const getProductById = async(request,response)=>{
    try{
        const product = await Product.findOne({'id':request.params.id})
        console.log('getProductById-----',product)
       return response.status(200).json(product)

    }catch(error){
        return response.status(500).json({message:error.message})
    }
}

