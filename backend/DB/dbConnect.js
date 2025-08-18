import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT),
        console.log("DB connected Succesfully");
    } catch (error) {
        console.log("Hi");
        console.log(console.error);
    }
}
 

export default dbConnect