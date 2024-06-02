import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const register = async (req, res) => {
  const { email, password } = req.body;
  const hashdPassword = await bycrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashdPassword,
      },
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "user registrsion failed" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user && (await bycrypt.compare(password, user, password))) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "150h",
      });
      return res
        .status(200)
        .json({ message: "User logged in successfully", token });
    }
    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({
        message:
          "Login failed due to unknown error, just hold on, we're fixing it.",
      });
  }
};

module.exports = { register, login };
