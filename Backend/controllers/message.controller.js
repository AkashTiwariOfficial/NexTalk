import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from '../models/conversation.model.js'
import { Message } from "../models/message.model.js";
import ApiResponses from "../utils/ApiResponses.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const sendMessage = asyncHandler(async (req, res) => {

    const { id: recieverId } = req.params;
    const { message } = req.body;
    const senderId = req.user?._id;

    let conversation;
    
  if (senderId.toString() ===  recieverId.toString()){
         conversation = await Conversation.findOne({
          participants: senderId,
          $expr: { $eq: [ { $size: "$participants" }, 1]}
      })
  } else {
      conversation = await Conversation.findOne({
          participants: { $all: [senderId, recieverId] }
      })
 }
    console.log(conversation);
    console.log(senderId);
    console.log(recieverId);

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, recieverId]
        })
    }

    let fileMessage;
    const uploadedFiles = [];

    for (const file of req?.files) {
        fileMessage = await uploadOnCloudinary(file?.path);
        const fileStructure = { url: fileMessage.url, size: fileMessage.bytes, orignalName: fileMessage.originalName, fileTypes: fileMessage.resource_type };
        uploadedFiles.push(fileStructure);
    }

    const newMessage = new Message({ message: message, attachements: uploadedFiles, senderId, recieverId });
    await conversation.messages.push(newMessage._id);

    await Promise.all([
        conversation.save(),
        newMessage.save()
    ])

    const sentMessage = newMessage;

    return res.status(200)
        .json(new ApiResponses(200, sentMessage, "message sent successfully"));

})

const getAllMessages = asyncHandler(async (req, res) => {
    const { id: recieverId } = req.params;
    const senderId = req.user?._id;

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] }
    }).populate("messages")

    return res.status(200).json(
        new ApiResponses(200, conversation, "All messages fetched successfully")
    )
})

export { sendMessage, getAllMessages };