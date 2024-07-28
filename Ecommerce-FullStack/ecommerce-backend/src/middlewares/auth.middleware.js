import jwt from 'jsonwebtoken';
import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header
    if (!token) {
      throw new ApiError(400, "Unauthorized request");
    }
    // Decode and verify the token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decodedToken) {
      throw new ApiError(401, "Invalid token");
    }

    // // Find the user associated with the token
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    // Attach the user object to the request object
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
