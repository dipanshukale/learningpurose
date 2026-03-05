import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

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
            required:true,
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

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password,10);
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

    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
);
};



const User = mongoose.model("User",userSchema);
export default User;