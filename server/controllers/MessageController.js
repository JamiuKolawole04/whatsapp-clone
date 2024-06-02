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
