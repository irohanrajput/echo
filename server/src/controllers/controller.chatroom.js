// src/controllers/chatController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createChatRoom = async (req, res) => {
  const { name } = req.body;
  try {
    const chatRoom = await prisma.chatRoom.create({ data: { name } });
    res.status(201).json(chatRoom);
  } catch (error) {
    res.status(400).json({ error: 'Chat room creation failed' });
  }
};

const getChatRooms = async (req, res) => {
  try {
    const chatRooms = await prisma.chatRoom.findMany();
    res.json(chatRooms);
  } catch (error) {
    res.status(500).json({ error: 'Fetching chat rooms failed' });
  }
};

module.exports = { createChatRoom, getChatRooms };
