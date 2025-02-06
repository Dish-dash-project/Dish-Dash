const express = require('express');
const router = express.Router();
const chatController = require('../controller/chat');
const authenticateJWT = require('../auth/auth');

router.get('/', authenticateJWT, chatController.getUserChats);
router.post('/', authenticateJWT, chatController.createChat);
router.get('/:chatId', authenticateJWT, chatController.getChatDetails);
router.post('/direct', authenticateJWT, chatController.createOrGetDirectChat);

module.exports = router; 