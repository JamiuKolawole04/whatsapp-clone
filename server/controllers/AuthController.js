import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ status: false, message: "email is required" });
    }

    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.json({ status: false, message: "user not found" });
    } else {
      return res.json({ status: true, message: "user found", data: user });
    }
  } catch (error) {
    next(error);
  }
};
