import { Router } from "express";

import { addMesage } from "../controllers/MessageController.js";

const router = Router();

router.post("/add-message", addMesage);

export default router;
