import { Conversation } from "../models/conversation.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiErrors from "../utils/ApiErrors.js";





const createGroup = asyncHandler(async (req, res) => {
    const { groupName, groupDescription } = req.body

    const isGroupExists = await Conversation.findOne({
        groupName: groupName,
        isGroup: true
    })

    if (isGroupExists) {
        throw new ApiErrors(409, "Group with name already exists");
    }

    const groupImageFilePath = req.file?.path;

    let groupImage, public_id;

    if (groupImageFilePath) {
        groupImage = await uploadOnCloudinary(groupImageFilePath);
        groupImage = groupImage?.url;
        public_id = groupImage?.public_id;
    } else {
        AvatargroupImage = `https://api.dicebear.com/7.x/bottts/svg?seed=${groupName}`;
    }

    const NewGroup = await Conversation.create({
        groupName: groupName,
        groupDescription: groupDescription,
        groupImage: groupImage,
        public_id: public_id,
        isGroup: true,
        participants: [req.user._id],
        admin: req.user._id
    })
})