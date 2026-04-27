import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    deletedFor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    clearedAT: {
        type: Map,
        of: Date,
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
    }],
    isGroup: {
        type: Boolean,
        default: false
    },
    groupName: {
        type: String
    },
    groupImage: {
        type: String
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    groupDescription: {
        type: String
    },
    group_public_id: {
        type: String
    }
}, { timestamps: true });

export const Conversation = mongoose.model("Conversation", conversationSchema);

