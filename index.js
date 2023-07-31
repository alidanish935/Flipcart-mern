import express from 'express'
import dotenv from 'dotenv'
import Connection from './database/db.js';
import DefaultData from './default.js'
import cors from 'cors';
import bodyParser from 'body-parser'
import {v4 as uuid} from 'uuid'

import Router from './routes/route.js'
const app = express();
 dotenv.config(); // to initialize dotenv we hv to use dotenv.config()

 app.use(cors())
 app.use(bodyParser.json({extended:true}));
 app.use(bodyParser.urlencoded({extended:true}))
 app.use('/', Router)

 const USERNAME = process.env.DB_USERNAME;
 const PASSWORD = process.env.DB_PASSWORD;
 Connection(USERNAME,PASSWORD);

const PORT = 5000 || process.env.PORT


 app.listen(PORT, ()=> console.log('server is running on ',PORT))
 
 DefaultData()

//  export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY
//  export let paytmParams = {};
//  paytmParams['MID'] = process.env.PAYTM_MID;
//  paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
//  paytmParams['CHANNEL_ID']= process.env.PAYTM_CHANNEL_ID;
//  paytmParams['INDUSTRY_TYPE'] = process.env.PAYTM_INDUSTRY_TYPE;
//  paytmParams['ORDER_ID'] = uuid();
//  paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
//  paytmParams['TXN_AMOUNT'] = '100'
//  paytmParams['EMAIL'] = 'alidanish935@gmail.com'
//  paytmParams['MOBILE_NO'] = '7545685258'
//  //paytmParams['CALLBACK_URL'] ='http://localhost:5000/callback'
//  //'http://localhost:5000/callback'
//  // 'https://flipcart-mern-eo8h.onrender.com/callback'

