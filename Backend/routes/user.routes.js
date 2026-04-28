import express from "express";
import { deleteAccount, fetchAlUser, getAllUsers, upadteAvatar, updateAccountDetails } from "../controllers/user.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/getAllConversation").get(
    verifyJwt,
    fetchAlUser
)

router.route("/getAllUsers").get(
    verifyJwt,
    getAllUsers
)

router.route("/update-account-details").patch(
    verifyJwt,
    updateAccountDetails
)

router.route("/update-avatar").patch(
    verifyJwt,
    upload.single("avatar"),
    upadteAvatar
)

router.route("/delete-account").delete(
    verifyJwt,
    deleteAccount
)

export default router