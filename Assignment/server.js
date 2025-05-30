const express = require('express');
const Userrouter = require('./routers/user');
const connectDB = require('./mongoDb/mongodb');


require('dotenv').config();
connectDB();

const app = express();
const PORT = process.env.PORT || undefined

//App level middlewares
app.use(express.json());


//Routes
app.use('/api', Userrouter);


app.get('/', (req, res) => {
    res.json({message: 'Welcome to Axia Backend class 💃🏼' });
})


  
app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);
});




