import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsers } from "../controller/user.controller.js";
const router = Router();

router.get("/", protectRoute, getUsers);
export default router;
