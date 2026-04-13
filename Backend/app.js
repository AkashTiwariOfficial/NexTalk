import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import express from "express"


const app = express();


app.use(express({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);



export default app