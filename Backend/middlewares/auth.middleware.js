import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler';
import ApiErrors from '../utils/ApiErrors';
import { User } from '../models/user.model';

const verifyJwt = asyncHandler( async( req, res, next ) => {
     const token =  req.cookies?.accessToken || req.header("Authorization")?.replace(/^Bearer\s*/, "");

     if(!token){
        throw new ApiErrors(401, "Unauthorized Access!");
     }

    const decode = jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET);
    
    const user= await User.findById(decode._id).select("-password");

    if(!user){
        throw new ApiErrors(401, "Invalid access token");
    }

    req.user = user;
    next();
})