import express from "express";
import { fetchAlUser, getAllUsers } from "../controllers/user.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.route("/getAllConversation").post(
    verifyJwt,
    fetchAlUser
)

router.route("/getAllUsers").post(
    verifyJwt,
    getAllUsers
)


export default router