import express from "express";
import { fetchAlUser } from "../controllers/user.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.route("/getAllusers").post(
    verifyJwt,
    fetchAlUser
)


export default router