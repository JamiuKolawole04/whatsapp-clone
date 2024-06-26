import getPrismaInstance from "../utils/PrismaClient.js";

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
        id: "asc",
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
