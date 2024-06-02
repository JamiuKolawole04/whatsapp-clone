import { Router } from "express";

import {
  checkUser,
  onBoardUser,
  loginUser,
  getAllUser,
} from "../controllers/AuthController.js";

const router = Router();

router.post("/check-user", checkUser);
router.post("/onboard-user", onBoardUser);
router.post("/login-user", loginUser);
router.get("/get-contacts", getAllUser);

export default router;
