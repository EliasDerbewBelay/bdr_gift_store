"use server";

import { uploadImage } from "@/lib/cloudinary";

/**
 * Server action to upload an image to Cloudinary
 * Accepts FormData with 'file' field
 */
export async function uploadToCloudinary(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const dataUrl = `data:${file.type};base64,${base64Image}`;

    const url = await uploadImage(dataUrl);

    return { success: true, url };
  } catch (error) {
    console.error("Server action upload error:", error);
    return { success: false, error: "Failed to upload image" };
  }
}
