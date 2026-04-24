import { User } from "../models/users.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


export const verifyJWT = asyncHandler(async (req, res, next) => {
// Get access token either from cookies or from Authorization header (Bearer token)
    const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    // If decodedToken exists, then access _id, otherwise return undefined.”
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }
    
    // Attach the authenticated user to the request object so that the next middleware/controller can use it.
    req.user = user;
    next(); 
  } catch (error) {
    throw new ApiError(401,"Invalid access token")
  }
});
