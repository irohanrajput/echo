import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const register = async (req, res) => {
  console.log(req.body);
  const { username, email, name, password } = req.body;
  if (!email || !name || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "User registration failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: "150h",
      });
      return res
        .status(200)
        .json({ message: "User logged in successfully", token });
    }
    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message:
        "Login failed due to unknown error, just hold on, we're fixing it.",
    });
  }
};
