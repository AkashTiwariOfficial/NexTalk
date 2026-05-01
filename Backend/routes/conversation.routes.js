import express from "express";
import { createGroup, deleteGroup, removeUser, toggleGroupAdmins, updateGroupSettings } from "../controllers/Coversation.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";



const router = express.Router();

router.route("/create-group").post(
    verifyJwt,
    upload.single("groupImage"),
    createGroup
)

router.route("/update-group-details/:conversationId").patch(
    verifyJwt,
    upload.single("groupImage"),
    updateGroupSettings
)

router.route("/delete-group/:conversationId").delete(
    verifyJwt,
    deleteGroup
)

router.route("/remove-user/:conversationId").patch(
    verifyJwt,
    removeUser
)

router.route("/toggle-admin-user/:conversationId").patch(
    verifyJwt,
    toggleGroupAdmins
)



export default router