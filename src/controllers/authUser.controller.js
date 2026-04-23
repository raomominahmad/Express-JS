import { User } from "../models/users.models";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError.js";
import {sendEmail} from "../utils/mail.js"

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    // saving refresh token to DB
    user.refreshToken = refreshToken;
    // skip schema validation before saving document , Mongoose skips the validation and just saves the changes
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating acess token",
      [],
    );
  }
};

const registeredUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(404, "User with email or usernmae already exists", []);
  }

  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryTokens();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({validateBeforeSave:false})
  
  await sendEmail(
    {
        email: user?.email,
        subject: "Please verify your email",
        mailgenContent: emailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}` // Dynamic link
        )

    }
  )
  
  // removing sensitive info so that it will not go to frontend 
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  )
  
  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering a user")
  }

  // user creation is confirmed so sending response
  return res
  .status(201)
  .json(
    new ApiResponse(
      200,
      {user: createdUser},
      "User registered successfully and verification email has been sent on your email"
    )
  )
});

export {
  registeredUser
}
