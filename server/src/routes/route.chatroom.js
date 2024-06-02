import express from 'express';
import {createChatRoom, getChatsRoom} from '../controllers/controller.chatroom.js';
const router = express.Router();

router.post('/chatrooms', createChatRoom);
router.get('/chatrooms', getChatsRoom);

module.exports = router;
