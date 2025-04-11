// hah om sai ram om bhaskaraaya namaha om namaha sivayaa

import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MONGODB Connected Successfully')
    } catch (err){
        console.error(err.message)
        process.exit(1)
    }
}

export default connectDB