import express from 'express';
import {createChatRoom, getChatRoom} from '../controllers/controller.chatroom.js';
const router = express.Router();

router.post('/chatrooms', createChatRoom);
router.get('/chatrooms', getChatRoom);

export default router;