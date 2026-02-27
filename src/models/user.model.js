import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv  from "dotenv";

config.dotenv();

const userSchema = new mongoose.Schema(
    {   
        fullName:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        userName:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        phone:{
            type:String,
            trim:true
        },
        address:{
            city:{
                type:String,
                trim:true
            },
            pincode:{
                type:String,
                trim:true
            }

        },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        refreshToken:{
            type:String
        }
    },

    {timestamps:true}
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.ispasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
};

userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        userName:this.userName,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
    },

    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
);
};



export const user = mongoose.model("user",userSchema);