import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import  ApiErrors  from "../utils/ApiErrors.js";
import  ApiResponses  from "../utils/ApiResponses.js";
import  { asyncHandler }  from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateRefreshAndAccesTokens } from "../utils/generateTokens.js";



const registerUser = asyncHandler(async (req, res) => {

    const { fullName, username, email, password, confirmPassword, gender } = req.body;

    if ([fullName, username, email, password, gender].some((field) => !field || field?.trim() === "")) {
        throw new ApiErrors(400, "All fields are Requried!");
    }

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        throw new ApiErrors(400, "Invalid Email format");
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existingUser) {
        if (existingUser.email === email) {
            throw new ApiErrors(409, "Email already exits");
        }
        if (existingUser.username === username) {
            throw new ApiErrors(409, "username already exits");
        }
    }

    if (password !== confirmPassword) {
        throw new ApiErrors(401, "Password does not match");
    }

    const avatarFilePath = req.file?.path;

    let Avatar, public_id;

    if (avatarFilePath) {
        Avatar = await uploadOnCloudinary(avatarFilePath);
         Avatar = Avatar?.url;  
         public_id = Avatar?.public_id;
    } else {
        Avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&gender=${gender}`;
      }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName: fullName,
        username: username,
        email: email,
        avatar: Avatar,
        gender: gender,
        password: hashedPassword,
        avatar_public_id: public_id || ""
    });

    if (!user) {
        throw new ApiErrors(500, "Error while creating user account in NexTalk");
    }

    const newUser = await User.findById(user._id).select("-password");

    if (!newUser) {
        throw new ApiErrors(500, "Error while creating user account in NexTalk");
    }

    return res.status(201)
        .json(
            new ApiResponses(201, newUser, "user created successfully")
        )

})


const loginUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!(username || email || password)) {
        throw new ApiErrors(400, "username or email is required!");
    }

    const loggedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (!loggedUser) {
        throw new ApiErrors(401, "Invalid user credentials")
    }

    const isPasswordCorrect = await bcrypt.compare(password, loggedUser.password);

    if (!isPasswordCorrect) {
        throw new ApiErrors(401, "Invalid user credentials")
    }

    const user = await User.findById(loggedUser._id).select("-password");

    const { tokenAccess, tokenRefresh } =  generateRefreshAndAccesTokens(user);

    const options = {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", tokenAccess, {
            httpOnly: true,
            maxAge: 1 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: true
        })
        .cookie("refreshToken", tokenRefresh, options)
        .json(new ApiResponses(200,
            {
                data: user, tokenAccess, tokenRefresh
            },
            "User logged in sucessfully"))

})


const logOutUser = asyncHandler(async (req, res) => {

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponses(200, {}, "User logged out sucessfully"))

})


export {
    registerUser,
    loginUser,
    logOutUser
}