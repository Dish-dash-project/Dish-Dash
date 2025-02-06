const express = require('express');
const router = express.Router();
const messageController = require('../controller/message');
const authenticateJWT = require('../auth/auth');

router.get('/chat/:chatId', authenticateJWT, messageController.getMessages);
router.post('/', authenticateJWT, messageController.sendMessage);
router.put('/chat/:chatId/read', authenticateJWT, messageController.markAsRead);

module.exports = router;
