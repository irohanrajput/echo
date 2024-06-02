// src/controllers/chatController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createChatRoom = async (req, res) => {
  const { name, description } = req.body;
  try {
    const room = await prisma.room.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json(room);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Couldn't create a chat room" });
  }
};

export const getChatRoom = async (req, res) => {
  try {
    const room = await prisma.room.findMany();
    res.json(room);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Fetching chat rooms failed" });
  }
};
