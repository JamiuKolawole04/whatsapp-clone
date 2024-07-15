import { Router } from "express";
import multer from "multer";

import {
  addImageMessage,
  addMesage,
  getAllMessage,
} from "../controllers/MessageController.js";

const router = Router();

const uploadImage = multer({ dest: "uploads/images" });

router.post("/add-message", addMesage);
router.get("/message/:from/:to", getAllMessage);
router.post("/add-image-message", uploadImage.single("image"), addImageMessage);

export default router;
