import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as userServices from "../services/user.service.js"

export const createUserRegister = asyncHandler(async (req,res)=> {
   const userData = req.body;
   console.log(userData);
   console.log("user data is coming",userData);

   const user = await userServices.createUserService(userData);
   res.status(201).json(new ApiResponse(201,user,"user created successfully"));
   
});

export const createUserLogin = asyncHandler(async(req,res)=> {
   const {userName,email,password} = req.body;
   console.log(userName,email,password);

   const {loginUser,accessToken,refreshToken,options} = await userServices.createLoginService(userName,email,password);

   res.status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .json(new ApiResponse(200,loginUser,"user login successfully"));
   
}); 

