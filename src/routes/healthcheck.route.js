import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck.controller.js";
//logic comes from controllers file

const router = Router();

router.route("/").get(healthcheck);
router.route("/instagram").get(healthcheck);

export default router;
