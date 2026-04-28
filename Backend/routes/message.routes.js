import express from "express";
import { deleteConversation, deleteMessage, editMessageContent, getAllMessages, sendMessage } from "../controllers/message.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/sendMessage/:id").post(
    verifyJwt,
    upload.array("files", 10),
    sendMessage
)

router.route("/getAllMessages/:id").post(
    verifyJwt,
    getAllMessages
)

router.route("/delete-message/:id").patch(
    verifyJwt,
    deleteMessage
)

router.route("/delete-conversation/:id").patch(
    verifyJwt,
    deleteConversation
)

router.route("/update-message/:messageId").patch(
    verifyJwt,
    editMessageContent
)

export default router