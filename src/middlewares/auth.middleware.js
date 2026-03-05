import jwt from "jsonwebtoken";
import User  from "../models/user.model.js";
import ApiError from "../utils/ApiError";
import {asynchandler} from "../utils/asynchandler.js";
import dotenv from "dotenv"

dotenv.config();

export const jwtVerify = asynchandler(async(req,res)=> {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");

    if(!token){
        throw new ApiError(401,"Token required");
    }

    const decodedToken = jwt.verify(token,process.JWT_SECRET_KEY);
    console.log(decodedToken);

    //when we do integration for login and signup then we used User from model bsed on that we find the user is exist.

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if(!user)throw new ApiError(401,"user not exist");

    req.user = user;
    next();

})