import express from 'express';
import Userrouter from './routers/user.js';
import productRouter from './routers/productRouters.js';
import cartRouter from './routers/cartRouter.js';
import cookieParser from 'cookie-parser';
import {connectDB }from './mongoDb/mongodb.js';


import dotenv from 'dotenv';
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || undefined

//App level middlewares
app.use(express.json());
app.use(cookieParser());


//Routes
app.use('/api', Userrouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);


app.get('/', (req, res) => {
    res.json({message: 'Welcome to Axia Third Examination 💃🏼' });
})


  
app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);
});




