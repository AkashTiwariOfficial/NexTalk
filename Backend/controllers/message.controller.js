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

    if (conversation && conversation.deletedFor.includes(senderId.toString())) {
        conversation = await Conversation.findByIdAndUpdate(conversationId, {
            $pull: {
                deletedFor: senderId
            },
        }, { new: true });
    }

    if (!conversation) {
        if (senderId.toString() === recieverId.toString()) {
            conversation = await Conversation.findOne({
                participants: senderId,
                $expr: { $eq: [{ $size: "$participants" }, 1] }
            })
        } else {
            conversation = await Conversation.findOne({
                participants: { $all: [senderId, recieverId] },
                $expr: { $eq: [{ $size: "$participants" }, 2] }
            })
        }
    }

    if (!conversation) {
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
        conversation.save({ timeStamps: true }),
        newMessage.save({ timeStamps: true })
    ])

    const sentMessage = newMessage;

    return res.status(200)
        .json(new ApiResponses(200, sentMessage, "message sent successfully"));

})

const getAllMessages = asyncHandler(async (req, res) => {
    const { id: conversationId } = req.params;
    
    const conversation = await Conversation.findById(conversationId);
    const clearedTime = conversation.clearedAt?.get(req.user?._id);
    const messages = await Message.find(conversationId, {
        createdAt: {
            $gt: clearedTime || Date.now(0)
        }
    })

    return res.status(200).json(
        new ApiResponses(200, messages, "All messages fetched successfully")
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
                await Conversation.findByIdAndUpdate(message.conversationId, {
                    $pull: {
                        messages: message?._id
                    }
                })
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

    if (conversation.deletedFor.includes(req.user?._id)) {
        throw new ApiErrors(409, "Conversation already deleted for you");
    }

    if (conversation.deletedFor.length === conversation.participants.length) {
        await Conversation.findByIdAndDelete(conversationId);
    } else {
        await Conversation.findByIdAndUpdate(conversationId, {
            $addToSet: {
                deletedFor: req.user?._id
            },
            $set: {
                [`clearedAt.${req.user?._id.toString()}`]: new Date()
            }
        }, { new: true }
        );
    }

    return res.status(200).json(
        new ApiResponses(200, {}, "Conversation deleted successfully")
    )

})


const editMessageContent = asyncHandler(async (req, res) => {

    const { messageId } = req.params;
    const { message } = req.body;

    if (!messageId) {
        throw new ApiErrors(404, "messageId is required!");
    }

    if (!message) {
        throw new ApiErrors(404, "message cannot be empty!");
    }

    const isexists = await Message.findById(messageId);

    if (!isexists) {
        throw new ApiErrors(401, "message does not exsits");
    }

    const updatedMessage = await Message.findByIdAndUpdate(messageId, {
        $set: {
            message: message
        }
    })

    return res.status(200)
        .json(
            200, updatedMessage, "message was updated successfully"
        )

})

export { sendMessage, getAllMessages, deleteMessage, deleteConversation, editMessageContent };