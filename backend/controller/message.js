const { Message, Chat, User } = require("../database/connection");

module.exports = {
    // Get all messages for a chat
    getMessages: async (req, res) => {
        try {
            const { chatId } = req.params;
            const messages = await Message.findAll({
                where: { chatId },
                include: [{
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'name', 'imageUrl']
                }],
                order: [['createdAt', 'ASC']]
            });
            res.json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ message: 'Error fetching messages' });
        }
    },

    // Send a new message
    sendMessage: async (req, res) => {
        try {
            const { chatId, content, type = 'TEXT' } = req.body;
            const senderId = req.user.userId;

            const message = await Message.create({
                chatId,
                senderId,
                content,
                type
            });

            // Update chat's last message
            await Chat.update({
                lastMessage: content,
                lastMessageTime: new Date()
            }, {
                where: { id: chatId }
            });

            // Fetch the complete message with sender info
            const completeMessage = await Message.findOne({
                where: { id: message.id },
                include: [{
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'name', 'imageUrl']
                }]
            });

            // Emit the message through Socket.IO
            req.app.get('io').to(chatId).emit('new_message', completeMessage);

            res.status(201).json(completeMessage);
        } catch (error) {
            console.error('Error sending message:', error);
            res.status(500).json({ message: 'Error sending message' });
        }
    },

    // Mark messages as read
    markAsRead: async (req, res) => {
        try {
            const { chatId } = req.params;
            const userId = req.user.userId;

            await Message.update(
                { read: true },
                {
                    where: {
                        chatId,
                        senderId: { [Op.ne]: userId },
                        read: false
                    }
                }
            );

            res.json({ message: 'Messages marked as read' });
        } catch (error) {
            console.error('Error marking messages as read:', error);
            res.status(500).json({ message: 'Error marking messages as read' });
        }
    }
};
