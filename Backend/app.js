import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import express from "express"


const app = express();


app.use(express({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(( err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: err.success || false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });
})


app.use("/v1/api/auth", authRoutes);



export default app