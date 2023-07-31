import Paytmchecksum from "../paytm/PaytmChecksum.js"
import {paytmMerchantkey,paytmParams} from '../index.js'

console.log('payUsingPaytm in controller-payment')

export const addPaymentGateway= async(req,res)=>{
    try{
       let paytmCheckSum =  await Paytmchecksum.generateSignature(paytmParams,paytmMerchantkey)
       const params = {
        ...paytmParams,
        'CHECKSUMHASH':paytmCheckSum
       }
       res.status(200).json(params)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}