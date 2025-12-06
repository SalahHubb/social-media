import ImageKit from "imagekit";
import "dotenv/config";
import Story from "../models/storySchema.js";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Use private key for backend operations
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadToImageKit = async (fileBuffer, fileName) => {
  try {
    // upload to imagekit
    const result = await imageKit.upload({
      file: fileBuffer,
      fileName,
    });

    return result.url;
  } catch (error) {
    console.log("Error during upload media", error.message);
    throw error;
  }
};

export default uploadToImageKit;
