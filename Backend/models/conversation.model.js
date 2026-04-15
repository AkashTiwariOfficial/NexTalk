import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
    }],
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);

