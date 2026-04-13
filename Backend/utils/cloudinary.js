import { v2 as cloudinary } from 'cloudinary'
import fs from "fs";



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  timeout: 900000,
});

const deleteLocalFile = async (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  } catch (error) {
    console.log("Error while deleting the local file path", error);
  }
}

const uploadOnCloudinary = async (locationFilePath, fileType = "auto") => {
  if (!locationFilePath) {
    console.log("No file path found!");
    return null;
  }

  let response;

  try {
    if (fileType === "video") {
      response = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(locationFilePath, {
          resource_type: "video",
          chunk_size: 7000000
        },
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result);
          })
      })
    } else {
      response = await cloudinary.uploader.upload(locationFilePath, {
        resource_type: fileType
      })
    }

    await deleteLocalFile(locationFilePath);

    return response;

  } catch (error) {
    await deleteLocalFile(locationFilePath);
    console.log("Error while uploading on cloudinary", error);
  }
}


const deleteFromCloudinary = async (public_id, type) => {
  try {
    if (!public_id) {
      return console.log("public_id for specified file do not exits")
    }

    await cloudinary.uploader.destroy(public_id, { resource_type: type })
  } catch (error) {
    console.log("Error while deleting from cloudinary: ", error.message);
  }
}

export {
  deleteFromCloudinary,
  uploadOnCloudinary
}