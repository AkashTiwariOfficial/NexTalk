import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from '../models/conversation.model.js'
import { Message } from "../models/message.model.js";
import ApiResponses from "../utils/ApiResponses.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const sendMessage = asyncHandler(async (req, res) => {

    const { id: conversationId = null } = req.params;
    const { message, recieverId } = req.body;
    const senderId = req.user?._id;

    let conversation;

    if (conversationId) {
        conversation = await Conversation.findById(conversationId);
    }

    if (!conversation) {
        if (senderId.toString() === recieverId.toString()) {
            conversation = await Conversation.findOne({
                participants: senderId,
                $expr: { $eq: [{ $size: "$participants" }, 1] }
            })
        } else {
            conversation = await Conversation.findOne({
                participants: { $all: [senderId, recieverId] }
            })
        }
        conversation = await Conversation.create({
            participants: [senderId, recieverId]
        })
    }

    let fileMessage;
    const uploadedFiles = [];

    if (req.files?.length) {
        for (const file of req?.files) {
            fileMessage = await uploadOnCloudinary(file?.path);
            const fileStructure = { url: fileMessage.url, size: fileMessage.bytes, orignalName: fileMessage.originalName, fileTypes: fileMessage.resource_type, public_id: fileMessage.public_id };
            uploadedFiles.push(fileStructure);
        }
    }

    const newMessage = new Message({ message: message, attachements: uploadedFiles, senderId, conversationId: conversation._id });
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
    const { id: conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId).populate("messages")

    return res.status(200).json(
        new ApiResponses(200, conversation, "All messages fetched successfully")
    )
})


const deleteMessage = asyncHandler(async (req, res) => {

    const { files } = req.body;

    if (files.length > 0) {
        for (const file of files) {
            const message = await Message.findById(file.messagedId);
            if (!message) {
                throw new ApiErrors(404, "Message not found");
            }

            if (message.senderId.toString() !== req.user?._id.toString()) {
                throw new ApiErrors(401, "You are not authorized to delete this message");
            }

            if (file.filesAttachments?.public_id) {
                await deleteFromCloudinary(file.filesAttachments.public_id, file.filesAttachments.fileTypes);
                await Message.findByIdAndUpdate(file.messagedId, {
                    $pull: {
                        attachements: {
                            public_id: file.filesAttachments.public_id,
                        }
                    }
                })
            } else {
                await Message.findByIdAndDelete(file.messagedId);
            }
        }
    }

    return res.status(200).json(
        new ApiResponses(200, {}, "Message deleted successfully")
    )

})


const deleteConversation = asyncHandler(async (req, res) => {
    const { id: conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId)
    if (!conversation) {
        throw new ApiErrors(404, "Conversation not found");
    }

    if (conversation.participants.includes(req.user?._id)) {
        throw new ApiErrors(401, "You are not authorized to delete this conversation");
    }

    await Conversation.findByIdAndDelete(conversationId);

    return res.status(200).json(
        new ApiResponses(200, {}, "Conversation deleted successfully")
    )

})

export { sendMessage, getAllMessages, deleteMessage, deleteConversation };