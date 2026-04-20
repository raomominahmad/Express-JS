import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// .controller in file name is convention

/* const healthcheck = async (req, res , next) => {
  try {
    const user = await getUserFromDB()
    res
      .status(200)
      .json(new ApiResponse(200, { message: "Server is running" }));
  } catch (error) {
    next(err)
  }
}; */

const healthcheck = asyncHandler(async(req,res) =>{
  res.status(200).json(new ApiResponse(200 , { message: "Server is running"}))
})

export { healthcheck };
