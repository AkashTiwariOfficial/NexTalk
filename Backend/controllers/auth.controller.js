import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponses from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";
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

    const { tokenAccess, tokenRefresh } = generateRefreshAndAccesTokens(user);

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


const generateOtp = () => {
    const otp = Math.floor(100000 + (Math.random() * 100000))
    const expiryIn = (Date.now() + (10 * 60 * 1000))
    const expireTime = new Date(expiryIn)
    const expTime = expireTime.toISOString()

    return { otp, expiryIn, expTime }
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_APP,
        pass: process.env.GMAIL_APP_PASSWORD,
    }
});


const sendOtp = asyncHandler(async (req, res) => {

    const { username, email } = req.body

    if (!(username || email)) {
        throw new ApiErrors(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiErrors(404, "User does not exists");
    }

    const { otp, expiryIn, expTime } = generateOtp();

    if (!(otp && expiryIn)) {
        throw new ApiErrors(400, "Error while generating OTP");
    }

        const users = await User.findById(req.user?._id)

        try {
            await transporter.sendMail({
                from: "noreply@Nextalk.com",
                to: users.email,
                subject: "Your NexTalk OTP Code",
                html: `
    <div style="font-family: system-ui, sans-serif, Arial; font-size: 14px">
      
      <h2 style="margin-bottom: 8px;">NexTalk Verification</h2>
      
      <p style="padding-top: 14px; border-top: 1px solid #eaeaea">
        To continue, please use the following One Time Password (OTP):
      </p>
      
      <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">
        ${otp}
      </p>
      
      <p>
        This OTP is valid for <strong>10 minutes</strong> until <strong>${expTime}</strong>.
      </p>
      
      <p>
        Do not share this OTP with anyone. If you did not request this, you can safely ignore this email.
      </p>
      
      <p style="margin-top: 20px;">
        NexTalk will never ask for your OTP or login credentials. Stay alert and avoid phishing attempts.
      </p>
      
      <p style="margin-top: 20px;">
        Thanks,<br/>
        <strong>NexTalk Team</strong>
      </p>
      
    </div>
  `
            });
        } catch (error) {
            throw new ApiErrors(400, error.message || "Sending of email failed");
        }

        const newOtp = await bcrypt.hash(otp.toString(), 10)

        const user = await User.findByIdAndUpdate(req.user?._id,
            {
                $set: {
                    otp: newOtp,
                    expiryIn: expiryIn,
                }
            }, { new: true }
        )

        return res
            .status(200)
            .json(new ApiResponses(200, {}, "Otp sent Through Email to user"))

})

const sendOtpforgotpassword = asyncHandler(async (req, res) => {

    const { username, email } = req.body

    if (!(username || email)) {
        throw new ApiErrors(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiErrors(404, "User does not exists");
    }

    const { otp, expiryIn, expTime } = generateOtp()

    if (!(otp && expiryIn)) {
        throw new ApiErrors(400, "Error while generating OTP");
    }

    try {

        const users = await User.findById(user._id)

        try {

            await transporter.sendMail({
                from: "noreply@StreamZY.com",
                to: users.email,
                subject: "Your OTP Code",
                html: `
      <div style="font-family: system-ui, sans-serif, Arial; font-size: 14px">
        <p style="padding-top: 14px; border-top: 1px solid #eaeaea">
          To authenticate, please use the following One Time Password (OTP):
        </p>
        <p style="font-size: 22px"><strong>${otp}</strong></p>
        <p>This OTP will be valid for 10 minutes till <strong>${expTime}</strong>.</p>
        <p>
          Do not share this OTP with anyone. If you didn't make this request, you can safely ignore this
          email.<br />StreamZY will never contact you about this email or ask for any login codes or
          links. Beware of phishing scams.
        </p>
        <p>Thanks for visiting StreamZY!</p>
      </div>
    `
            });
        } catch (error) {
            throw new ApiErrors(400, error.message || "Sending of email failed");
        }

        const newOtp = await bcrypt.hash(otp.toString(), 10)

        await User.findByIdAndUpdate(user._id,
            {
                $set: {
                    otp: newOtp,
                    expiryIn: expiryIn,
                }
            }, { new: true }
        )

        return res
            .status(200)
            .json(new ApiResponses(200, {}, "Otp sent Through Email to user"))

    } catch (error) {
        throw new ApiErrors(500, error.message || "Internal Server Error while sending otp to user");
    }

})

const otpVerification = asyncHandler(async (req, res) => {

    const { otp } = req.body

    if (!otp) {
        throw new ApiErrors(400, "Otp is requried for email verification  to change password ");
    }

    const clearOtp = async () => {
        await User.findByIdAndUpdate(req.user?._id,
            {
                $set: {
                    otp: "",
                    expiryIn: ""
                }
            }, { new: true }
        )
    }
    try {
        const user = await User.findById(req.user?._id)

        if (Date.now() > parseInt(user.expiryIn)) {
            await clearOtp();
            throw new ApiErrors(400, "Error: Otp expired or Invalid. Try again");
        }

        const securedOtp = await bcrypt.compare(otp.toString(), user.otp)

        if (!securedOtp) {
            throw new ApiErrors(401, "Error: Otp expired or Invalid. Try again");
        }

        await clearOtp()

        return res
            .status(200)
            .json(new ApiResponses(200, {}, "OTP verified successfully"));
    } catch (error) {
        clearOtp()
        throw new ApiErrors(500, error.message || "Internal server error while verying otp")
    }

})

const otpVerificationForgotPassword = asyncHandler(async (req, res) => {

    const { username, email, otp } = req.body

    if (!(username || email)) {
        throw new ApiErrors(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiErrors(404, "User does not exists");
    }

    const clearOtp = async () => {
        await User.findByIdAndUpdate(user?._id,
            {
                $set: {
                    otp: "",
                    expiryIn: null
                }
            }, { new: true }
        )
    }
    try {

        if (Date.now() > parseInt(user.expiryIn)) {
            await clearOtp();
            throw new ApiErrors(400, "Error: Otp expired or Invalid. Try again");
        }

        const securedOtp = await bcrypt.compare(otp.toString(), user.otp)

        if (!securedOtp) {
            throw new ApiErrors(401, "Error: Otp expired or Invalid. Try again");
        }

        const resetToken = await user.generateResetToken(user._id)

        await clearOtp()

        return res
            .status(200)
            .json(new ApiResponses(200, { resetToken }, "OTP verified successfully"));
    } catch (error) {
        clearOtp()
        throw new ApiErrors(500, error.message || "Internal server error while verying otp")
    }

})

const refreshAccessandRefreshTokens = asyncHandler(async (req, res) => {

    const incoming = req.cookies?.refreshToken || req.header("refreshToken")

    const incomingRefreshToken = incoming?.trim();

    if (!incomingRefreshToken) {
        throw new ApiErrors(401, "Unauthorized Access! Access Denied")
    }

    try {
        const decodedToken = await jwt.verify(incomingRefreshToken, process.env.REFRESH_JWT_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiErrors(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiErrors(401, "Refresh token is either expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(user._id)

        return res
            .status(200)
            .cookie("AccessToken", accessToken, options)
            .cookie("RefreshToken", refreshToken, options)
            .json(
                new ApiResponses(200, {
                    accessToken,
                    refreshToken: refreshToken
                },
                    "Access Token refreshed successfully"
                )
            )
    } catch (error) {
        throw new ApiErrors(500, error?.message || "Invaild refersh token");
    }
})

const changePassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body

    if (!(oldPassword || newPassword)) {
        throw new ApiErrors(400, "Both fields are required");
    }

    try {
        const user = await User.findById(req.user?._id)
        const ispasswordCorrect = await user.isPasswordCorrect(oldPassword)

        if (!ispasswordCorrect) {
            throw new ApiErrors(400, "Invalid password");
        }

        user.password = newPassword;
        await user.save({ validateBeforeSave: false })

        return res
            .status(200)
            .json(new ApiResponses(200, {}, "Password was changed Successfully"))
    } catch (error) {
        throw new ApiErrors(500, error.message || "Internal Server Error while changing password");
    }
})



export {
    registerUser,
    loginUser,
    logOutUser
}