import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import conversationRoutes from './routes/conversation.routes.js';
import express from "express";


const app = express();


app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/messages", messageRoutes);
app.use("/v1/api/users", userRoutes);
app.use("/v1/api/conversations", conversationRoutes);




app.use(( err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: err.success || false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });
})

app.get("/", (req, res) => {
    res.send("Working");
})


export default app