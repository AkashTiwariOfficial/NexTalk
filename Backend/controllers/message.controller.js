import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from '../models/conversation.model.js'
import { Message } from "../models/message.model.js";
import ApiResponses from "../utils/ApiResponses.js";

const sendMessage = asyncHandler(async (req, res) => {
    const { id: recieverId } = req.params;
    const { message } = req.body;
    const senderId = req.user?._id;

    let conversation;

    conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] }
    })

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, recieverId]
        })
    }

    const newMessage = new Message({ message, senderId, recieverId });
    await conversation.messages.push(message);

    const sentMessage = new Promise.all([
        Conversation.save(),
        Message.save()
    ])

    return res.status(200)
        .json(new ApiResponses(200, sentMessage, "message sent successfully"));
})

const getAllMessages = asyncHandler(async (req, res) => {
    const { id: recieverId } = req.params;
    const senderId = req.user?._id;

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] }
    }).populate("messages")

    if (!conversation) {
        console.log('no messages found');
    }

    return res.status(200).json(
        new ApiResponses(200, conversation, "Conversation fetched successfully")
    )
})

export { sendMessage, getAllMessages };