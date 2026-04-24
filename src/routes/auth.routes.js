import {Router} from "express"
import {registeredUser} from "../controllers/authUser.controller.js"
import { validate } from "../middlewares/validator.middleware.js"
import { userRegisterValidator } from "../validators/userRegister.validator.js"

const router = Router()

// validate is a middleware, flow is userRegisterValidator -> get any error if any by validator  -> at end register user 
router.route("/register").post(userRegisterValidator(),validate,registeredUser)

export default router;