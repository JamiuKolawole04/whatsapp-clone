import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ status: false, message: "email is required" });
    }

    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ status: false, message: "user not found" });
    } else {
      return res.json({ status: true, message: "user found", data: user });
    }
  } catch (error) {
    next(error);
  }
};

export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, about, image: profilePicture } = req.body;

    if (!name || !email || !profilePicture) {
      return res
        .status(400)
        .json({ status: false, message: "email, name an image are required" });
    }

    const prisma = getPrismaInstance();
    const user = await prisma.user.create({
      data: { name, email, about, profilePicture },
    });

    res.status(200).json({
      status: true, message: "success", user
      
     });
  } catch (error) {
    next(error);
  }
};

export const loginUser = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
