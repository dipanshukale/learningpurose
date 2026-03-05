import User  from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { getVectorStore } from "./vector.service.js";
import { Document } from "@langchain/core/documents";

export const genereteAccessTokenAndRefreshToken = async(userId)=> {
    try {
        const user = await User.findById(userId);
        console.log(user);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken  = refreshToken;
        await user.save({validateBeforeSave:false});

        return {accessToken,refreshToken};

    } catch (error) {
        throw new ApiError(400,"something went wrong while generating refresh token and acces token");
    }
}

export const createUserService = async (userData) => {

    if (!userData?.fullName || userData.fullName.trim().length === 0) {
        throw new ApiError(400, "fullName is required");
    }

    if (!userData?.userName || userData.userName.trim().length === 0) {
        throw new ApiError(400, "userName is required");
    }

    if (!userData?.email || !/^\S+@\S+\.\S+$/.test(userData.email)) {
        throw new ApiError(400, "Valid email is required");
    }

    if (!userData?.phone || userData.phone.trim().length === 0) {
        throw new ApiError(400, "phone is required");
    }

    if (!userData?.password || userData.password.trim().length === 0) {
        throw new ApiError(400, "Password is required");
    }

    console.log("user data is we're sending to db");
    const user = await User.create(userData);

    const userCreated = await User.findById(user._id)
        .select("-password -refreshToken");
    console.log("user created successfully",userCreated);
    
    const vectorStore = await getVectorStore();
    await vectorStore.addDocuments([
        new Document({
            pageContent:userCreated,
            metadata:{
                source:"User-Data",
                userId:userCreated._id.toString()
            },
        }),
    ]);
    return userCreated;
};

export const createLoginService = async (userName,email,password)=> {
    //validation
    if(!email && !userName){
        throw new ApiError(400,"userName or Email is required");
    };

    const user = await User.findOne({$or: [{email}, {userName}]});

    if(!user){
        throw new ApiError(400,"user not exist please do signup");
    };

    const isValidPassword = await user.ispasswordCorrect(password);

    if(!isValidPassword){
        throw new ApiError(400,"invalid user credentials");
    };

    const {accessToken,refreshToken} = genereteAccessTokenAndRefreshToken(user._id);
    const loginUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure:true,
    };

    return {loginUser,accessToken,refreshToken,options};

}