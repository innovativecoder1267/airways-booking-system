import mongoose from "mongoose";
import asynchandler from "../utils/asynchandler.js";
import apierrorhandler from "../utils/apierrorhandler.js";
import { User } from "../models/user.model.js";
const ShowBookings=asynchandler(async(req,res)=>{
    const userid=req.user.id
    if(!mongoose.Types.ObjectId.isValid(userid)){
        throw new apierrorhandler("Cant validate the User id")
    }
    const FindUser=await User.findById(userid).populate("bookings")
    if(!FindUser){
        throw new apierrorhandler(404,"Cant Find the user")
    }
    return res.status(200).json({
        message:"Booking Fetched Successfully",
        data:FindUser.bookings||[]//it return the bookings array in 
    })

})
export default ShowBookings;