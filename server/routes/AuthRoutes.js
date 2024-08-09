import { Router } from "express";

import {
  checkUser,
  onBoardUser,
  loginUser,
  getAllUser,
  generateToken,
} from "../controllers/AuthController.js";

const router = Router();

router.post("/check-user", checkUser);
router.post("/onboard-user", onBoardUser);
router.post("/login-user", loginUser);
router.get("/get-contacts", getAllUser);
router.get("/generate-token/:userId", generateToken);

export default router;
