import express from "express";
import { getAllMessages, sendMessage } from "../controllers/message.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.route("/sendMessage/:id").post(
    verifyJwt,
    sendMessage
)

router.route("/getAllMessages/:id").post(
    verifyJwt,
    getAllMessages
)

export default router