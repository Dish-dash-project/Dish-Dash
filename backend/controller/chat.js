const { Chat, User, Message } = require("../database/connection");
const { Op } = require("sequelize");

module.exports = {
    // Get all chats for a user
    getUserChats: async (req, res) => {
        try {
            const userId = req.user.userId;
            
            const chats = await Chat.findAll({
                include: [
                    {
                        model: User,
                        as: 'participants',
                        attributes: ['id', 'name', 'imageUrl'],
                        through: { attributes: [] }
                    },
                    {
                        model: Message,
                        as: 'messages',
                        separate: true,
                        limit: 20,
                        order: [['createdAt', 'DESC']],
                        include: [{
                            model: User,
                            as: 'sender',
                            attributes: ['id', 'name', 'imageUrl']
                        }]
                    }
                ],
                where: {
                    '$participants.id$': userId
                }
            });

            const formattedChats = chats.map(chat => {
                const chatJson = chat.toJSON();
                return {
                    ...chatJson,
                    messages: chatJson.messages ? chatJson.messages.reverse() : [],
                    unreadCount: chatJson.messages ? 
                        chatJson.messages.filter(m => !m.read && m.senderId !== userId).length : 0
                };
            });

            res.json(formattedChats);
        } catch (error) {
            console.error('Error fetching chats:', error);
            res.status(500).json({ message: 'Error fetching chats' });
        }
    },

    // Create a new chat
    createChat: async (req, res) => {
        try {
            const { participantIds, type = 'DIRECT', name } = req.body;
            const userId = req.user.userId;

            // Ensure current user is included in participants
            const allParticipantIds = [...new Set([...participantIds, userId])];

            const chat = await Chat.create({
                type,
                name: type === 'GROUP' ? name : null
            });

            await chat.setParticipants(allParticipantIds);

            // Fetch complete chat with participants
            const completeChat = await Chat.findOne({
                where: { id: chat.id },
                include: [{
                    model: User,
                    as: 'participants',
                    attributes: ['id', 'name', 'imageUrl']
                }]
            });

            res.status(201).json(completeChat);
        } catch (error) {
            console.error('Error creating chat:', error);
            res.status(500).json({ message: 'Error creating chat' });
        }
    },

    // Get chat details
    getChatDetails: async (req, res) => {
        try {
            const { chatId } = req.params;
            const userId = req.user.userId;

            const chat = await Chat.findOne({
                where: { id: chatId },
                include: [{
                    model: User,
                    as: 'participants',
                    attributes: ['id', 'name', 'imageUrl']
                }]
            });

            if (!chat) {
                return res.status(404).json({ message: 'Chat not found' });
            }

            // Verify user is a participant
            const isParticipant = chat.participants.some(p => p.id === userId);
            if (!isParticipant) {
                return res.status(403).json({ message: 'Not authorized to access this chat' });
            }

            res.json(chat);
        } catch (error) {
            console.error('Error fetching chat details:', error);
            res.status(500).json({ message: 'Error fetching chat details' });
        }
    },

    // Create or get a direct chat
    createOrGetDirectChat: async (req, res) => {
        try {
            const { participantId } = req.body;
            const currentUserId = req.user.userId;

            // Check if chat already exists between these users
            const existingChat = await Chat.findOne({
                include: [{
                    model: User,
                    as: 'participants',
                    where: {
                        id: {
                            [Op.in]: [currentUserId, participantId]
                        }
                    },
                    attributes: ['id', 'name', 'imageUrl']
                }],
                where: {
                    type: 'DIRECT'
                }
            });

            if (existingChat) {
                return res.json(existingChat);
            }

            // Create new chat if it doesn't exist
            const newChat = await Chat.create({
                type: 'DIRECT'
            });

            await newChat.setParticipants([currentUserId, participantId]);

            // Fetch complete chat with participants
            const completeChat = await Chat.findOne({
                where: { id: newChat.id },
                include: [{
                    model: User,
                    as: 'participants',
                    attributes: ['id', 'name', 'imageUrl']
                }]
            });

            res.status(201).json(completeChat);
        } catch (error) {
            console.error('Error creating/getting direct chat:', error);
            res.status(500).json({ message: 'Error creating/getting direct chat' });
        }
    }
}; 