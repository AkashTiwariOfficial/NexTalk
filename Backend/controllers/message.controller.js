import { asyncHandler } from "../utils/asyncHandler";

const sendMessage = asyncHandler( async ( req, res )=>{
    const { id: recieverId } = req.params;
    const { message } = req.body;
    const senderId = req.user?._id;
    
})