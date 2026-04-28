import express from "express";
import { changePassword, loginUser, logOutUser, otpVerification, refreshAccessandRefreshTokens, registerUser, sendOtp } from "../controllers/auth.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.route("/register").post(
    upload.single("avatar"),
    registerUser
)

router.route("/login").post(
    loginUser
)

router.route("/logout").post(
    verifyJwt,
    logOutUser
)


router.route("/send-otp").patch(
    verifyJwt,
    sendOtp
)


router.route("/verify-otp").patch(
    verifyJwt,
    otpVerification
)


router.route("/verify-otp").patch(
    verifyJwt,
    otpVerification
)

router.route("/refresh-token-generation").patch(
    verifyJwt,
    refreshAccessandRefreshTokens
)

router.route("/change-password").patch(
    verifyJwt,
    changePassword
)

router.route("/verify-otp-forgot-password").patch(
    otpVerification
)

router.route("/refresh-token-generation").patch(
    verifyJwt,
    refreshAccessandRefreshTokens
)

router.route("/forgot-change-password").patch(
    changePassword
)

router.route("/send-otp-forgot-password").patch(
    sendOtp
)

export default router