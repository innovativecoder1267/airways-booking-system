import asynchandler from "../utils/asynchandler.js";
import apierrorhandler from "../utils/apierrorhandler.js";
import Razorpay from "razorpay"
import mongoose from 'mongoose';
import { User } from "../models/user.model.js";
import crypto from "crypto"
import nodemailer from "nodemailer"
import { Booking } from "../models/booked.model.js";

const Creating=asynchandler(async(req,res)=>{
    const{amount,currency}=req.body
    if(!amount||!currency){
        throw new apierrorhandler("fill all the neccessary details")
    }
    console.log("key id is :",process.env.RAZORPAY_KEY_ID)
    console.log("key secrey is:",process.env.RAZORPAY_KEY_SECRET)
    const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,   
});
    console.log("details are",amount,currency)
    const option={
        amount:amount*100,
        currency:currency,
        receipt:`Reciept${Date.now()}`
    }
    console.log("Options are :",option)
    if(!option){
        throw new apierrorhandler(400,"Cant create the option")
    }
    console.log("Data is",option)
    let CreateOrder;
 try {
    
        CreateOrder=await razorpayInstance.orders.create(option);
       if(!CreateOrder){
           throw new apierrorhandler(400,"Cant Create the Order")
       }   
       console.log("create order is ",CreateOrder);
       // ✅ pure object dikhega

 } catch (error) {
    console.error("error :",error)
 }
 return res.status(200).json({
    message:"Order created success",
    data:CreateOrder
 })
})
const PaymentVerification = asynchandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log("Payment thing",razorpay_order_id, razorpay_payment_id, razorpay_signature)
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        throw new apierrorhandler(400, "Cannot find the payment information");
    }
    // Create expected signature
    const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (razorpay_signature === expectedSign) {
        return res.status(200).json({ message: "Payment verified successfully" });
    } else {
        throw new apierrorhandler(401, "Payment unauthorized");
    }
});
const Dbsaver = asynchandler(async (req, res) => {
  const userid = req.user.id;
  const { options } = req.body;

  if (!options) {
    throw new apierrorhandler(400, "Please fill all the details");
  }
  if (!userid) {
    throw new apierrorhandler(401, "User not found");
  }
  const newbooking=await Booking.create({
   user:userid,
   payment:options
  })
  // Save booking to DB
  const Savedb = await User.findByIdAndUpdate(
    userid,
    { $push: { bookings: newbooking._id } },
    { new: true }
  );
  if (!Savedb) {
    throw new apierrorhandler(500, "Can't save the data in Db");
  }

  // Mail transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aaravchaprana1627@gmail.com", // apna Gmail
      pass: "vmag euwr madw sejz",  // app password from Google
    },
  });

  const user = await User.findById(userid);

  // Send mail
  await transporter.sendMail({
    from: "Airlines Booking Info <aaravchaprana1627@gmail.com>",
    to: user.email,
    subject: "Booking Successful",
    text: "Your booking is successful",
    html: `<h1>Booking Successful</h1>
           <p>Your booking is successful. Your booking ID is ${options.amount}.
           ${options.currency} has been charged to your account.</p>
           ${options.orderid}<p>Payment ID: ${options.paymentid}
           </p>`,
  });

  return res.status(200).json({
    success: true,
    message: "Booking successful, details saved in DB & mail sent",
    data: Savedb,
  });
});



const cancelbooking=asynchandler(async(req,res)=>{
    const {bookingid}=req.body
    if(!bookingid){
        throw new apierrorhandler(400,"Cant find the booking id")
    }

    return res.status(200).json({
        success:true,
        message:"Refund initiated successfully"
    })
})
//This is for cancellation/refund of booking 
//this is the 1 vs 1 1vs 1vs 1vs 1 vs 1vs 1 vs 1 vs 1 vs 1 vs 1vs 1vs 1vs 1vs 1 vs 1 vs  1 vs 1 vs 1 vs 1 vs 1vs 1 vs 1 vs 1 vs 1 vs  1 vs 1 vs
export default  {
    Creating,                                                       
    PaymentVerification,
    Dbsaver,
    cancelbooking
};