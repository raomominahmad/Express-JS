import {Router} from "express"
import {registeredUser} from "../controllers/authUser.controller.js"

const router = Router()

router.route("/register").post(registeredUser)

export default router;