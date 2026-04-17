import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";


/**

 * @param {string} filePath
 * @param {object} options
 */


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  timeout: 900000,
});


const uploadOnCloudinary = async (filePath, options = {}) => {
  if (!filePath || !fs.existsSync(filePath)) {
    console.log("File not found:", filePath);
    return null;
  }

  try {

    const ext = path.extname(filePath).toLowerCase();

    const imageExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const videoExt = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
    const rawExt = [
      ".pdf", ".doc", ".docx", ".ppt", ".pptx",
      ".xls", ".xlsx", ".zip", ".rar", ".txt"
    ];

    let resource_type = "auto";
    let folder = "NexTalk/misc";

    if (imageExt.includes(ext)) {
      resource_type = "image";
      folder = "NexTalk/images";
    } 
    else if (videoExt.includes(ext)) {
      resource_type = "video";
      folder = "NexTalk/videos";
    } 
    else if (rawExt.includes(ext)) {
      resource_type = "raw";
      folder = "NexTalk/files";
    }

    // ⚡ base options
    const uploadOptions = {
      resource_type,
      folder,
      use_filename: true,
      unique_filename: true,
      ...options,
    };

    let response;

    if (resource_type === "video") {

      response = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(
          filePath,
          {
            ...uploadOptions,
            chunk_size: 7000000,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
      });
    } else {
      response = await cloudinary.uploader.upload(filePath, uploadOptions);
    }

    // 🧹 delete local file
    await fs.promises.unlink(filePath);

    return response;

  } catch (error) {
    console.log("Cloudinary Upload Error:", error);

    try {
      await fs.promises.unlink(filePath);
    } catch {}

    return null;
  }
};


const deleteFromCloudinary = async (public_id, resource_type = "image") => {
  if (!public_id) return;

  try {
    return await cloudinary.uploader.destroy(public_id, {
      resource_type,
    });
  } catch (error) {
    console.log("Cloudinary Delete Error:", error);
  }
};

export {
  uploadOnCloudinary,
  deleteFromCloudinary
};