import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoute);

const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
