import express from 'express';
import {createChatRoom, getChatRoom} from '../controllers/controller.chatroom.js';
import authenticateToken from '../middlewares/middleware.auth.js';


const router = express.Router();

// router.post('/', authenticateToken, createChatRoom);
// router.get('/', authenticateToken, getChatRoom);

router.post('/', createChatRoom);
router.get('/', getChatRoom);k

export default router;