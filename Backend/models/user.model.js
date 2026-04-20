import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        avatar: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            required: true
        },
        password: {
            type: String,
            required: true
        },
        avatar_public_id: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);


export const User = mongoose.model("User", userSchema);