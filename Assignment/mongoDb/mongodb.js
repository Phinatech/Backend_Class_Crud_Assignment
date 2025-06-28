import mongoose from 'mongoose';

 export const connectDB = async () => {
    
    try {
            await mongoose.connect(process.env.mongodb_url, {
   
        });
        console.log(`connected to MongoDB successfully `);
    } catch (err) {
        console.log(err.message);
    }
}   

