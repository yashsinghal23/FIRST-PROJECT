import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';



const uploadonCloudinary = async (localfilepath) => {
    cloudinary.config({
  cloud_name: process.env.CloudName,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});
   

    try {  
        if(!localfilepath) {
            return null;
        }


        const result = await cloudinary.uploader.upload(localfilepath,{
            resource_type: 'auto',
        });
        fs.unlinkSync(localfilepath);
        return result.secure_url;
    }

    catch(error){
        fs.unlinkSync(localfilepath);
        console.log(error);
       return null;
    }
}

export default uploadonCloudinary;