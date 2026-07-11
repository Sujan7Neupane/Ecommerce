import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// console.log(process.env.CLOUDINARY_CLOUD_NAME);
// console.log(process.env.CLOUDINARY_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (localFilePath) => {
  try {
    // console.log("Local file path:", localFilePath);

    if (!localFilePath) return null;

    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log("Uploaded to cloudinary!", uploadResponse.url);
    fs.unlinkSync(localFilePath);
    return uploadResponse;
  } catch (error) {
    fs.unlinkSync(localFilePath); //removes file if error
    // console.error(error);

    return null;
  }
};

export default cloudinaryUpload;
