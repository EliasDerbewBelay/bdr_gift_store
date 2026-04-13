import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Uploads a base64 encoded image or a buffer to Cloudinary
 */
export const uploadImage = async (fileStr: string, folder: string = "products") => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: `bdr_gift_store/${folder}`,
      resource_type: "auto",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

/**
 * Deletes an image from Cloudinary using its secure URL
 */
export const deleteImage = async (imageUrl: string) => {
  try {
    // Extract public ID from the URL
    // Format: https://res.cloudinary.com/cloud_name/image/upload/v123456789/bdr_gift_store/products/public_id.jpg
    const parts = imageUrl.split("/");
    const lastPart = parts[parts.length - 1]; // public_id.jpg
    const publicIdWithExtension = lastPart.split(".")[0]; // public_id
    
    // We need to include the folder path as well
    const folderPath = "bdr_gift_store/products/";
    const publicId = `${folderPath}${publicIdWithExtension}`;

    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return { success: false, error: "Failed to delete image from Cloudinary" };
  }
};
