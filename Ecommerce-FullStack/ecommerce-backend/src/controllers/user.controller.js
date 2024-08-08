// import mongoose from "mongoose";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import  jwt from "jsonwebtoken"

const registerUser=asyncHandler(async(req,res)=>{

    const { fullname, email, password } = req.body;

    // Check for required fields
    if ([fullname, email, password].some(field => field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(406, "User with this email already exists");
    }

    // Handle profile picture upload (optional)
    let profilePicUrl = null;
    if (req.file) {
        const photo = req.file.path;
        const avatar = await uploadOnCloudinary(photo);

        if (!avatar) {
            throw new ApiError(400, "Failed to upload profile picture");
        }
        profilePicUrl = avatar.url;
    }

    // Create new user
    const user = await User.create({
        fullname,
        email,
        password,
        profilePic: profilePicUrl,
        role: "normal",
    });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
        throw new ApiError(400, "Something went wrong");
    }

    return res.status(200).json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser=asyncHandler(async(req,res)=>{
    const { email, password } = req.body;
  if (!password || !email) {
    throw new ApiError(400, "password and Email is required");
  }
  const user = await User.findOne({email});
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  // pass checker
  const isPasswordValid = await user.isPasswordCorrect(password)
  if (!isPasswordValid) {
    throw new ApiError(402, "Invalid User credentials");
  }
  const tokenData = {
    _id: user._id,
    email: user.email,
    role: user.role // Include the role in the token if needed
  };
  
  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '3h' });

  // Send the token and user info in response
  const tokenOption={
    httpOnly:true,
    secure:true
  }
  res.cookie("token",token,tokenOption).json(new ApiResponse(200, {
    token,
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role
    }
  }, "User logged in successfully"));
})
const currentUser = asyncHandler(async (req, res) => {
    return res
      .status(200)
      .json(new ApiResponse(200, req.user, "current user fetched successfully"));
  });
const logoutUser=asyncHandler(async(req,res)=>{
  try {
    res.status(200).clearCookie("token")

    res.json({
      message:"Logged Out successfully",
      error:false,
      success:true,
      data:[]
    })
  } catch (err) {
    res.json({
      message:err.message ||err,
      error:true,
      success:false
    })
  }
})
const getAllusers=asyncHandler(async(req,res)=>{
  // TODO: to get all the user we only have to find the 

  const users=await User.find().select("-password ");
  // if(!users){
    
  // }
  try {
    // console.log("userid",req.user?._id)
    res.status(200).json(new ApiResponse(200,users,"all users fetched"))
  } catch (error) {
    throw new ApiError(400,"unable to fetch the details")
  }

})
export {registerUser,loginUser,currentUser,logoutUser,getAllusers}