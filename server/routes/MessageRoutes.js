import { Router } from "express";

import { addMesage, getAllMessage } from "../controllers/MessageController.js";

const router = Router();

router.post("/add-message", addMesage);
router.get("/message/:from/:to", getAllMessage);

export default router;
