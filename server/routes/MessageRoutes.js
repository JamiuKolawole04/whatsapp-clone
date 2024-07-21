import { Router } from "express";
import multer from "multer";

import {
  addAudioMessage,
  addImageMessage,
  addMesage,
  getAllMessage,
} from "../controllers/MessageController.js";

const router = Router();

const uploadImage = multer({ dest: "uploads/images" });
const upload = multer({ dest: "uploads/recordings" });

router.post("/add-message", addMesage);
router.get("/message/:from/:to", getAllMessage);
router.post("/add-image-message", uploadImage.single("image"), addImageMessage);
router.post("/add-audio-message", uploadImage.single("audio"), addAudioMessage);

export default router;
