import express from 'express'
import dotenv from 'dotenv'
import Connection from './database/db.js';
import DefaultData from './default.js'
import cors from 'cors';
import bodyParser from 'body-parser'

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