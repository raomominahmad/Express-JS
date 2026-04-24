import {Router} from "express"
import {registeredUser,loginUser,logoutUser} from "../controllers/authUser.controller.js"
import { validate } from "../middlewares/validator.middleware.js"
import { userRegisterValidator,userLoginValidator } from "../validators/validator.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

// validate is a middleware, flow is userRegisterValidator -> get any error if any by validator  -> at end register user 
router.route("/register").post(userRegisterValidator(),validate,registeredUser)
router.route("/login").post(userLoginValidator(),validate,loginUser)

// secure routes
router.route("/logout").post(verifyJWT,logoutUser)

export default router;