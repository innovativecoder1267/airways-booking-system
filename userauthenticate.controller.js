import apierrorHandler from "../utils/apierrorhandler.js";
import asynchandler from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";

const registerUser=asynchandler(async(req,res)=>{
    const {username,email,password}=req.body
    if(!username||!email||!password){
        throw new apierrorHandler(400,"Please fill all the fields")
    }
    const userExists=await User.findOne
    ({email:email})
    if(userExists){
        throw new apierrorHandler(400,"User already exists")
    }
    const user=await User.create({
        username:username,
        email:email,
        password:password
    })
    if(!user){
        throw new apierrorHandler(400,"User creation failed")
    }
    res.status(201).json({
        success:true,
        message:"User created successfully",
        data:user
    })
})   
const logincustomer=asynchandler(async(req,res)=>{
    const{email,password}=req.body
    if(!email||!password){
        throw new apierrorHandler(400,"Please fill all the fields")
    }
    const user=await User.findOne({email:email})
    if(!user){  
        throw new apierrorHandler(400,"User does not exist")
    }
    if(user.password!==password){
        throw new apierrorHandler(400,"Invalid credentials")
    }
    const accesstoken=user.generateaccesstoken()
    const refreshtoken=user.generaterefreshtoken()
    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        data:{
            user:user,
            accesstoken:accesstoken,
            refreshtoken:refreshtoken
        }
    })   
})
const logoutcustomer=asynchandler(async(req,res)=>{
    const userid=req.body;
    if(!userid){
        throw new apierrorHandler("user id not found")
    }
    res.clearcookies("accesstoken",{httponly:true,secure:true,sameSite:true})
    res.clearcookies("accesstoken",{httponly:true,secure:true,sameSite:true})
    res.status(200,"user logged out successfully")
})
const GoogleUser = asynchandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new apierrorHandler("Can't collect all the required details");
    }

    let existingUser = await user.findOne({ email });

    if (!existingUser) {
        existingUser = await user.create({
            name,
            email,
            password,
        });
    }

    const accessToken = await existingUser.generateaccesstoken();
    const refreshToken = await existingUser.generaterefreshtoken();

    if (!accessToken || !refreshToken) {
        throw new apierrorHandler("Can't generate access or refresh token for the specific user");
    }

    return res.status(200).json({
        message: "Info Saved Successfully",
        accessToken,
        refreshToken,
    });
});
export default {
    logincustomer,
    registerUser,
    logoutcustomer,
    GoogleUser
};
//this is the one who is the biggest nigga and i am the one who is not more towards but towards the navyblue seal
//google user is about creating the user in refresh token and access token 