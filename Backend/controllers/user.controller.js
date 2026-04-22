import { Conversation } from "../models/conversation.model.js";
import { User } from "../models/user.model.js";
import ApiResponses from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const fetchAlUser = asyncHandler(async (req, res) => {

    const conversations = await Conversation.find({
        participants: { $in: [req.user?._id] }
    }).populate("participants", "username avatar fullName");

    return res.status(200)
        .json(new ApiResponses(200, conversations, "User conversations fetched successfully"));
})

export const getAllUsers = asyncHandler( async ( req, res ) => {

    const allUsers = await User.find();

    return res.status(200)
    .json(
        new ApiResponses(200, allUsers, "All users fetched successfully")
    )
    
})

