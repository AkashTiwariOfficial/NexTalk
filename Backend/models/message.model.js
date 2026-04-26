import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    attachements: [
        {
            url: String,
            size: Number,
            orignalName: String,
            fileTypes: String,
            public_id: String
        }
    ]
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);

