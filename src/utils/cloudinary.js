import {v2 as Cloudinary} from "cloudinary";
import dotenv from "dotenv";
import ApiError from "./ApiError";

dotenv.config();

Cloudinary.config({
    Cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret:process.env.CLOUDINARY_CLOUD_API_SECRET,
});

export const uploadToCloudinary = async(fileBuffer,folderName)=> {
    try {
        const uploadResult = await new Promise((resolve,reject) => {
            const uploadResult = Cloudinary.uploader.upload_stream(
                {folderName},

                (error,result) => {
                    if(error)reject(error);
                    else resolve(result);
                }
            );
            uploadResult.end(fileBuffer);
        });
        return uploadResult;
    } catch (error) {
        throw new ApiError(400,"error occured while uploading to cloudinary");
    }
}
