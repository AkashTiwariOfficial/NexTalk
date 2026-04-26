import { Conversation } from "../models/conversation.model.js";
import { User } from "../models/user.model.js";
import ApiResponses from "../utils/ApiResponses.js";
import ApiErrors from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

export const fetchAlUser = asyncHandler(async (req, res) => {

  const conversations = await Conversation.find({
    participants: { $in: [req.user?._id] }
  }).populate("participants", "username avatar fullName");

  return res.status(200)
    .json(new ApiResponses(200, conversations, "User conversations fetched successfully"));
})


export const getAllUsers = asyncHandler(async (req, res) => {

  const allUsers = await User.find();

  return res.status(200)
    .json(
      new ApiResponses(200, allUsers, "All users fetched successfully")
    )

})


export const getCurrentUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user?._id).select("-password")

  if (!user) {
    throw new ApiErrors(404, "User not does exists");
  }

  return res
    .status(200)
    .json(new ApiResponses(200, { user }, "Current user fetched successfully"))

})


export const updateAccountDetails = asyncHandler(async (req, res) => {

  const { fullName, email, username } = req.body

  if (!(fullName || email || username)) {
    throw new ApiErrors(400, "Atleast one field is required");
  }

  const user = await User.findByIdAndUpdate(req.user?._id,
    {
      $set: {
        fullName,
        email,
        username
      }
    },
    { new: true }
  ).select(
    "-password"
  )

  return res
    .status(200)
    .json(new ApiResponses(200, user, "Account details updated successfully"))

})


export const upadteAvatar = asyncHandler(async (req, res) => {
  const newAvatarFilePath = req.file?.path

  if (!newAvatarFilePath) {
    throw new ApiErrors(400, "Avatar file is missing");
  }

  try {
    const avatar = await uploadOnCloudinary(newAvatarFilePath);

    if (!avatar.url) {
      throw new ApiErrors(400, "Error while updating and uploading Avatar on cloudinary");
    }

    try {
      if (req.user?.avatar_public_id) {
        await deleteFromCloudinary(req.user?.avatar_public_id, "image");
      }
    } catch (error) {
      await deleteFromCloudinary(avatar.public_id)
      throw new ApiErrors(500, "Failed to delete old avatar, rollback new upload")
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
      {
        $set: {
          avatar: avatar.url,
          avatar_public_id: avatar.public_id
        }
      }, { new: true }
    ).select(
      "-password"
    )

    return res
      .status(200)
      .json(new ApiResponses(200, user, "Avatar file updated successfully"))
  } catch (error) {
    throw new ApiErrors(500, error.message || "Internal Server Error while updating Avatar file")
  }

})


export const deleteAccount = asyncHandler(async (req, res) => {

  const userId = req.user?._id;
 
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await findById(userId).select("-password").session(session);
    await Conversation.updateMany({ participants: userId }, {
      $pull: {
        participants: { $in: userId }
      }
    }, { session });
    if(user?.avatar_public_id){
      await deleteFromCloudinary(user?.avatar_public_id, "image").session(session);
    }
    await User.findByIdAndDelete(req.user?._id, { session });

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json(new ApiResponses(200, {}, "Account has been deleted successfully"))
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiErrors(500, "Internal Server Error while deleting user account" || error.message)
  }

})






