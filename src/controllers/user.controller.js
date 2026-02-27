import asynchandler from "../utils/asynchandler";
import ApiResponse from "../utils/ApiResponse";

export const createUserRegister = asynchandler((req,res)=> {
   const { fullName,userName,email,phone,address,password } = req.body;
   console.log(fullName);

   

});
