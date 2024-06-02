import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import authRoute from "./routes/AuthRoutes.js";
import messageRoute from "./routes/MessageRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

global.onlineUsers = new Map();
