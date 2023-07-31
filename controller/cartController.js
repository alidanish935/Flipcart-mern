import cart from "../modal/cartSchema.js"

export const addToCart = async(req,res)=>{

const exist = await cart.findOne({_id:req.body._id})
// console.log('exist---',exist)
try{
        // if(exist){
            
        //     console.log('addToCart in cartcontroller line 9',exist.quantity)
        //     const updateCart = await cart.findByIdAndUpdate( {_id:exist._id},{quantity:exist.quantity+1})
        //     console.log('updateCart - ',updateCart)
        //     await updateCart.save()
        //   // const updateItem = await cart.findByIdAndUpdate({_id:req.body._id},)
        // return res.status(201).json(updateCart);

        // }
        // else{
            const item = req.body
            const newItem = new cart(item)
            await newItem.save()
            console.log('addToCart in cartcontroller new-----',newItem)
            res.status(200).json(newItem)
           
        // }

    }catch(error){
        console.log('error while adding cart in db-----',error.message)
         res.status(500).json({message:error.message})
    }
}
export const getCartItem = async(req,res)=>{
    try{
        // console.log('req body---',req.body)
        const cartItem = await cart.find({customer_id:req.params.customer_id})
        // console.log('cartItem from db -- ',cartItem)
        res.status(200).json(cartItem)
    }catch(error){
        console.log('error in getCartItem controller - ',error.message)
        res.status(500).json({message:error.message})
    }
}
export const deleteCartItem = async(req,res)=>{
    try{
        const id = req.params.id
        const order = await cart.findByIdAndDelete(id)
        // console.log('order in deleteCartItem----',order)
        return res.status(200).json(order)
    }catch(error){
        console.log('error while deleting from db',error.message)
        res.status(500).json({message:error.message})
    }
}
