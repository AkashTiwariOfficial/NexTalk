import { Conversation } from "../models/conversation.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiErrors from "../utils/ApiErrors.js";
import { isFloat64Array } from "util/types";
import ApiResponses from "../utils/ApiResponses.js";





export const createGroup = asyncHandler(async (req, res) => {

  const { groupName, groupDescription, participants } = req.body

  if (!(groupName || participants)) {
    throw new ApiErrors(400, "Group name and participants are required");
  }

  if (participants.length < 2) {
    throw new ApiErrors(400, "Atleast 2 participants are required");
  }

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
    groupDescription: groupDescription || "",
    groupImage: groupImage,
    public_id: public_id || "",
    isGroup: true,
    participants: participants,
    admin: req.user?._id
  })

  if (!NewGroup) {
    throw new ApiErrors(500, "Error while creating new group");
  }

  return res.status(201)
    .json(
      new ApiResponses(201, NewGroup, "Group created successfully")
    )

})


export const updateGroupSettings = asyncHandler(async (req, res) => {

  const { groupName, groupDescription } = req.body
  const { conversationId } = req.params;

  if (!conversationId) {
    throw new ApiErrors(404, "conversationId is required!");
  }

  if (!(groupName || groupDescription)) {
    throw new ApiErrors(400, "Group name or groupDescription are required");
  }

  const group = await Conversation.findById(conversationId);

  if (!group) {
    throw new ApiErrors(409, "Group does not exists");
  }

  const groupImageFilePath = req.file?.path;

  let groupImage, public_id;

  if (groupImageFilePath) {
    groupImage = await uploadOnCloudinary(groupImageFilePath);
    groupImage = groupImage?.url;
    public_id = groupImage?.public_id;
  }

  try {
    if (group?.group_public_id) {
      await deleteFromCloudinary(group?.group_public_id, "image");
    }
  } catch (error) {
    await deleteFromCloudinary(public_id, "image");
    throw new ApiErrors(500, "Failed to delete old avatar, rollback new upload");
  }

  const tobeUpdatedField = {};

  if (groupName) {
    tobeUpdatedField.groupName = groupName;
  }

  if (groupDescription) {
    tobeUpdatedField.groupDescription = groupDescription;
  }

  if (groupImage && public_id) {
    tobeUpdatedField.groupImage = groupImage;
    tobeUpdatedField.group_public_id = public_id;
  }


  const updatedGroup = await Conversation.findByIdAndUpdate(conversationId,
    {
      $set: tobeUpdatedField
    }, { new: true }
  )

  return res.status(200)
    .json(
      200, updatedGroup, "group details was updated successfully"
    )

})


export const deleteGroup = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  if (!conversationId) {
    throw new ApiErrors(404, "conversationId is required!");
  }

  const group = await Conversation.findById({ _id: conversationId, isGroup: true });

  if (!group) {
    throw new ApiErrors(409, "Group does not exists");
  }

  if (group.groupAdmin.includes(req.user?._id)) {
    throw new ApiErrors(401, "You are not authorized to delete the group");
  }

  await Conversation.findByIdAndDelete(conversationId);

  return res.status(200)
    .json(new ApiResponses(200, {}, "Group was deleted successfully"))

})


export const toggleGroupAdmins = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const { AdminId } = req.body;

  if (!conversationId) {
    throw new ApiErrors(404, "conversationId is required!");
  }

  const group = await Conversation.findById({ _id: conversationId, isGroup: true });

  if (!group) {
    throw new ApiErrors(409, "Group does not exists");
  }

  if (group.groupAdmin.includes(req.user?._id)) {
    throw new ApiErrors(401, "You are not authorized to delete the group");
  }
  if (group.groupAdmin.includes(AdminId)) {
    const upadteAdmins = await Conversation.findByIdAndUpdate(conversationId, {
      $pull: {
        groupAdmin: AdminId
      }
    })
  } else {
    const upadteAdmins = await Conversation.findByIdAndUpdate(conversationId, {
      $addToSet: {
        groupAdmin: AdminId
      }
    })
  }

  return res.status(200)
    .json(
      new ApiResponses(200, upadteAdmins, "Admin was successfully toggled")
    )

})