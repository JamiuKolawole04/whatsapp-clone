import { Router } from "express";

import {
  checkUser,
  onBoardUser,
  loginUser,
} from "../controllers/AuthController.js";

const router = Router();

router.post("/check-user", checkUser);
router.post("/onboard-user", onBoardUser);
router.post("/login-user", loginUser);

export default router;
