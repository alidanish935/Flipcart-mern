import cart from "../modal/cartSchema.js"

export const addToCart = async(req,res)=>{

// const exist = await cart.findOne({customer_id:req.body.customer_id,url:req.body.url})
const exist = await cart.findOne({customer_id:req.body.customer_id,id:req.body.id,url:req.body.url})
console.log('exist---',exist)
try{
        if(exist){
            
            // console.log('addToCart in cartcontroller line 9',exist.customer_id)
            // const updateCart = await cart.findByIdAndUpdate( {id:exist.id},{quantity:exist.quantity+1})
            // const updateCart = await cart.findOneAndUpdate( {customer_id:exist.customer_id},{quantity:exist.quantity+1})
            const updateCart = await cart.findOneAndUpdate( {customer_id:exist.customer_id,id:exist.id,url:exist.url},{quantity:exist.quantity+1})
            await updateCart.save()
            console.log('updateCart - ',updateCart)
          // const updateItem = await cart.findByIdAndUpdate({_id:req.body._id},)
        return res.status(201).json(updateCart);

        }
        else{
            const item = req.body
            // console.log('item in cartcontroller----',item)
            const newItem = new cart(item)
            console.log('addToCart in cartcontroller new-----',newItem)
            await newItem.save()
            // const newItem = await cart.create(item)
            res.status(200).json(newItem)
           
        }//64a7ab6f80fb18dc26342bb5

    }catch(error){
        console.log('error while adding cart in db-----',error.message)
         res.status(500).json({message:error.message})
    }
}


export const IncreaseItemQuantity = async(req,res)=>{
    const id = req.params.id
    const exist = await cart.findOne({_id:id})
    console.log('exist in IncreaseItemQuantity ---',exist)
    try{
        if(exist){
        
            const updateCart = await cart.findOneAndUpdate({_id:id},{quantity:exist.quantity+1})
            await updateCart.save()
            // console.log('updateCart in IncreaseItemQuantity----',updateCart)
            return res.status(200).json(updateCart)
           
        }
    }catch(error){
        console.log('error while increasing quan in db-----',error.message)
        res.status(500).json({message:error.message})
    }
}
export const DecreaseItemQuantity = async(req,res)=>{
    const id = req.params.id
    const exist = await cart.findOne({_id:id})
    console.log('exist in IncreaseItemQuantity ---',exist)
    try{
        if(exist){ 
            const updateCart = await cart.findOneAndUpdate({_id:id},{quantity:exist.quantity-1})
            await updateCart.save()
            // console.log('updateCart in IncreaseItemQuantity----',updateCart)
            return res.status(200).json(updateCart)
           
        }
    }catch(error){
        console.log('error while increasing quan in db-----',error.message)
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
        
        console.log('id in deleteCartItem----',id)
        const order = await cart.findByIdAndDelete(id)
        console.log('order in deleteCartItem----',order)
        return res.status(200).json(order)
    }catch(error){
        console.log('error while deleting from db',error.message)
        res.status(500).json({message:error.message})
    }
}
