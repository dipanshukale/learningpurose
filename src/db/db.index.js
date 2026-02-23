import mongoose from "mongoose";
import asyncHandler from "../utils/asynchandler.js";
import  dotenv  from "dotenv";

dotenv.config();        

export const connectDB = asyncHandler(async()=> {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected : ${conn.connection.host}`);
});