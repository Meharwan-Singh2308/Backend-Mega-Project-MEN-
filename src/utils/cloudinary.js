import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

        
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        // File upload on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });
        //File Uploaded seccussfully 

        // console.log('file is Uploaded on cloudinary',response.url)
        fs.unlinkSync(localFilePath)

        return response;
    } catch (error) {
        console.log('cloudinary upload error',error)
        fs.unlinkSync(localFilePath);//Remove Lacally saved temporary file as the upload operation got failed

        return null;

    }
}


export {uploadOnCloudinary}