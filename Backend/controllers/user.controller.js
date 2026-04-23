import { Conversation } from "../models/conversation.model.js";
import { User } from "../models/user.model.js";
import ApiResponses from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const fetchAlUser = asyncHandler(async (req, res) => {

    const conversations = await Conversation.find({
        participants: { $in: [req.user?._id] }
    }).populate("participants", "username avatar fullName");

    return res.status(200)
        .json(new ApiResponses(200, conversations, "User conversations fetched successfully"));
})

export const getAllUsers = asyncHandler( async ( req, res ) => {

    const allUsers = await User.find();

    return res.status(200)
    .json(
        new ApiResponses(200, allUsers, "All users fetched successfully")
    )
    
})


const getCurrentUser = asyncHandler(async (req, res) => {

  try {
    const user = await User.findById(req.user?._id).select(
      "-password -refreshToken"
    )

    if (!user) {
      throw new ApiErrors(404, "User not does exists");
    }

    return res
      .status(200)
      .json(new ApiResponses(200, { user }, "Current user fetched successfully"))
  } catch (error) {
    throw new ApiErrors(500, "Internal Server Error")
  }

})


const updateAccountDetails = asyncHandler(async (req, res) => {

  const { fullName, email, username } = req.body

  if (!(fullName || email || username)) {
    throw new ApiErrors(400, "Atleast one field is required")
  }

  try {
    const user = await User.findByIdAndUpdate(req.user?._id,
      {
        $set: {
          fullName,
          email,
          username
        }
      },
      { new: true }
    ).select(
      "-password -refreshToken"
    )

    return res
      .status(200)
      .json(new ApiResponses(200, user, "Account details updated successfully"))
  } catch (error) {
    throw new ApiErrors(500, error.message || "Internal Server Error while updating Account details");
  }

})


const upadteAvatar = asyncHandler(async (req, res) => {
  const newAvatarFilePath = req.file?.path

  if (!newAvatarFilePath) {
    throw new ApiErrors(400, "Avatar file is missing");
  }

  try {
    const avatar = await uploadOnCloudinary(newAvatarFilePath)

    if (!avatar.url) {
      throw new ApiErrors(400, "Error while updating and uploading Avatar on cloudinary")
    }

    try {
      if (req.user?.public_id_avatar) {
        await deleteFromCloudinary(req.user?.public_id_avatar)
      }
    } catch (error) {
      await deleteFromCloudinary(avatar.public_id)
      throw new ApiErrors(500, "Failed to delete old avatar, rollback new upload")
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
      {
        $set: {
          avatar: avatar.url,
          public_id_avatar: avatar.public_id
        }
      }, { new: true }
    ).select(
      "-password -refreshToken")

    return res
      .status(200)
      .json(new ApiResponses(200, user, "Avatar file updated successfully"))
  } catch (error) {
    throw new ApiErrors(500, error.message || "Internal Server Error while updating Avatar file")
  }

})


const deleteAccount = asyncHandler(async (req, res) => {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const videos = await Video.find({ owner: req.user?._id }).session(session);
    const videoIds = videos.map(v => v._id)
    await Like.deleteMany({ video: { $in: videoIds } }, { session });
    await Comment.deleteMany({ video: { $in: videoIds } }, { session });
    const comments = await Comment.find({ video: { $in: videoIds } }).select("_id").session(session);
    await ReplyComment.deleteMany({ comment: { $in: comments.map(c => c._id) } }, { session });
    await Views.deleteMany({ videoId: { $in: videoIds } }, { session });
    await Playlist.updateMany({ videos: { $in: videoIds } }, {
      $pull: { videos: { $in: videoIds } }
    }, { session })
    await User.updateMany({ "watchHistory.video": { $in: videoIds } }, {
      $pull: {
        watchHistory: {
          video: { $in: videoIds }
        }
      }
    }, { session })
    await User.updateMany({ "savedVideos.video": { $in: videoIds } }, {
      $pull: {
        savedVideos: {
          video: { $in: videoIds }
        }
      }
    }, { session })
    await Video.deleteMany({ owner: req.user?._id }, { session });
    await Like.deleteMany({ likedBy: req.user?._id }, { session });
    await Views.deleteMany({ vistedUser: req.user?._id }, { session });
    await Comment.deleteMany({ owner: req.user?._id }, { session })
    await ReplyComment.deleteMany({ owner: req.user?._id }, { session })
    await Subscription.deleteMany({
      $or: [
        { subscriber: req.user?._id },
        { channel: req.user?._id }
      ]
    }, { session })
    await Playlist.deleteMany({ owner: req.user?._id }, { session });
    await User.findByIdAndDelete(req.user?._id, { session });

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json(new ApiResponses(200, {}, "Account has been deleted successfully"))
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiErrors(500, "Internal Server Error while deleting user account" || error.message)
  }

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

  const { otp, expiryIn, expTime } = generateOtp()

  if (!(otp && expiryIn)) {
    throw new ApiErrors(400, "Error while generating OTP");
  }

  try {

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

  } catch (error) {
    throw new ApiErrors(500, error.message || "Internal Server Error while sending otp to user");
  }

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

