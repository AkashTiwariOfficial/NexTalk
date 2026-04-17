import express from "express";
import { getAllMessages, sendMessage } from "../controllers/message.controller.js"
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

export default router