import mongoose from "mongoose";
import  dotenv  from "dotenv";
import ApiError from "../utils/ApiError.js";

dotenv.config();        

export const connectDB = async()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        throw new ApiError(400,"MongoDB error occured",error);
    }
};