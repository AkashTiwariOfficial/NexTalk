import express from "express";
import { loginUser, logOutUser, registerUser } from "../controllers/auth.controller.js"

const router = express.Router();

router.route("/register").post(
    upload.single("avatar"),
    registerUser
)

router.route("/login").post(
    loginUser
)

router.route("/logout").post(
    logOutUser
)



export default router