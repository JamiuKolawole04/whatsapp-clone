import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { Server } from "socket.io";

import authRoute from "./routes/AuthRoutes.js";
import messageRoute from "./routes/MessageRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/uploads/images", express.static("uploads/images"));
app.use("/uploads/recordings", express.static("uploads/recordings"));

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

const clientOrigin = ["http://localhost:3000"];

const io = new Server(server, {
  cors: {
    origin: clientOrigin,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-message", (data) => {
    const getUserSocket = onlineUsers.get(data.to);

    if (getUserSocket) {
      socket.to(getUserSocket).emit("message-received", {
        from: data.from,
        message: data.message,
      });
    }
  });
});
