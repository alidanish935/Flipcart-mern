import nodemailer from 'nodemailer'

const tarnsporter = nodemailer.createTransport({
    service:"gmail",
    
    auth:{
        user:'alidanish935@gmail.com',
        pass:'wyxwdukwlzlfulvm'
    }
})



export const sendMailOrder=async(req,res)=>{

    const email = req.body[0].email
    const customer = req.body[0].customer_id
    console.log('req body-- ',email,'customer--',customer)
    const product = req.body.map((item)=>{
        return item.title.shortTitle
    })
    const product1 = req.body[0].title.shortTitle

    // const res = ()=>{
    //     for(let i=0;i<product.length;i++){

    //     }
    // }
    
    console.log('product--',product)
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000))

    // calculating total item 
    const totalCartItem = req.body.map((item)=>{
        return item.quantity
      }).reduce((total,item)=>{
        return total+item
      },0)

      console.log('totalCartItem--- ',totalCartItem)
       // calculating total price
       let price = 0, discount = 0;
       req.body.map(item => {
           price += item.price.mrp*totalCartItem
           discount += (item.price.mrp - item.price.cost) * totalCartItem
       })
       let totalAmount = price - discount + 40
      console.log('totalAmount--- ',totalAmount)

    try{
        const mailOptions = {
            from:'alidanish935@gmail.comL',
            to:email,
            subject:` Order placed on Flipcart for ₹ ${totalAmount}`,
            text:`Thanks for choosing  flipcart ${customer}  `,
            html: `<p><b> Thanks for choosing  flipcart ${customer} </b> </p>
                    <p> Your <b> ${product.length}</b> item  ${product.map((item)=>(
                        ` <b>${item}</b>`
                    ))}, quantity ${totalCartItem} successfully booked for amount ₹ ${totalAmount} and it will dispatch by tommorrow and expected to Deliver by <span style={{color:'green'}}> ${date.toDateString()} </span> </p>
                    <p>if you have any query feel free to contact us - 7549048614 </P>
                    <p> Thanks and have a good day</p>
            `

        }


        tarnsporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log('error ',error)
                res.status(400).json({error})
            }else{
                console.log('email sent ',info.response)
                res.status(200).json({message:'email sent successfully'})
            }
        })
    }catch(error){
        res.status(500).json({error:error.message})
    }

}