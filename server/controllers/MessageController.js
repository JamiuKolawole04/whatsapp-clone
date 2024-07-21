import { renameSync } from "node:fs";

import getPrismaInstance from "../utils/PrismaClient.js";
import { log } from "node:console";

export const addMesage = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { from, to, message } = req.body;

    const getUser = onlineUsers.get(to);

    if (message && from && to) {
      const newMessage = await prisma.message.create({
        data: {
          message,
          sender: { connect: { id: parseInt(from) } },
          receiver: { connect: { id: parseInt(to) } },
          status: getUser ? "delivered" : "sent",
        },
        include: { sender: true, receiver: true },
      });

      return res.status(201).json({ message: newMessage });
    }

    res.status(400).json({ message: "from, to and message are all required" });
  } catch (error) {
    next(error);
  }
};

export const getAllMessage = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { from, to } = req.params;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: parseInt(from),
            receiverId: parseInt(to),
          },
          {
            senderId: parseInt(to),
            receiverId: parseInt(from),
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const unreadMessages = [];
    messages.forEach((message, index) => {
      //if message  status is sent or delivered
      if (message.status !== "read" && message.senderId === parseInt(to)) {
        messages[index].status = "read";
        unreadMessages.push(message.id);
      }
    });

    await prisma.message.updateMany({
      where: {
        id: { in: unreadMessages },
      },
      data: {
        status: "read",
      },
    });

    console.log({ unreadMessages, to });

    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};

export const addImageMessage = async (req, res, next) => {
  try {
    if (req.file) {
      const date = Date.now();
      let fileName = "uploads/images/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      const prisma = getPrismaInstance();
      const { from, to } = req.query;

      if (from && to) {
        const message = await prisma.message.create({
          data: {
            message: fileName,
            sender: { connect: { id: parseInt(from) } },
            receiver: { connect: { id: parseInt(to) } },
            type: "image",
          },
        });

        return res.status(201).json({ message });
      }

      return res.status(400).json({ message: "from, to are all required" });
    }

    return res.status(400).json({ message: "image is required" });
  } catch (error) {
    next(error);
  }
};

export const addAudioMessage = async (req, res, next) => {
  try {
    if (req.file) {
      const date = Date.now();
      let fileName = "uploads/recordings/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      const prisma = getPrismaInstance();
      const { from, to } = req.query;

      if (from && to) {
        const message = await prisma.message.create({
          data: {
            message: fileName,
            sender: { connect: { id: parseInt(from) } },
            receiver: { connect: { id: parseInt(to) } },
            type: "audio",
          },
        });

        return res.status(201).json({ message });
      }

      return res.status(400).json({ message: "from, to are all required" });
    }

    return res.status(400).json({ message: "audio is required" });
  } catch (error) {
    next(error);
  }
};

export const getInitialContactsMessage = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const userId = parseInt(req.params.from);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        sentMessages: {
          include: { receiver: true, sender: true },
          orderBy: { createdAt: "desc" },
        },
        receivedMessages: {
          include: { receiver: true, sender: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    const messages = [...user.sentMessages, ...user.receivedMessages];
    messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const users = new Map();
    const messageStatusChange = [];

    messages.forEach((msg) => {
      const isSender = msg.senderId === userId;
      const calculatedId = isSender ? msg.receiverId : msg.senderId;

      if (msg.status === "sent") {
        messageStatusChange.push(msg.id);
      }

      if (!users.get(calculatedId)) {
        const { id, type, message, status, createdAt, senderId, receiverId } =
          msg;

        let user = {
          messageId: id,
          type,
          message,
          status,
          createdAt,
          senderId,
          receiverId,
        };

        if (isSender) {
          user = { ...user, ...msg.receiver, totalUnreadMessages: 0 };
        } else {
          user = {
            ...user,
            ...msg.sender,
            totalUnreadMessages: status != "read" ? 1 : 0,
          };
        }

        users.set(calculatedId, { ...user });
      } else if (msg.status !== "read" && !isSender) {
        const user = users.get(calculatedId);
        users.set(calculatedId, {
          ...user,
          totalUnreadMessages: user.totalUnreadMessages + 1,
        });
      }
    });

    if (messageStatusChange.length) {
      await prisma.message.updateMany({
        where: {
          id: { in: messageStatusChange },
        },
        data: {
          status: "delivered",
        },
      });
    }

    return res.status(200).json({
      users: Array.from(users.values()),
      onlineUsers: Array.from(onlineUsers.keys()),
    });
  } catch (error) {
    next(error);
  }
};
