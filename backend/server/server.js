const express = require('express');
const path = require('path');
const PORT = 3000;
const fs = require('fs');
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
// const { Chat, Message, User } = require('../database/connection');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const seedDatabase = require('../database/seeds');
// seedDatabase()
const db=require("../database/connection")


async function initializeDatabase() {
  try {
  
      await seedDatabase();
      console.log('Database initialized successfully');
  } catch (error) {
      console.error('Database initialization failed:', error);
  }
}
// initializeDatabase()

// CORS configuration - place this before any routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both ports
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Important: Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// server configuration
// app.use('/api', restaurantRoutes)
// app.use('/api', categoryRoutes)
// make the server listen to requests
require('dotenv').config();
const userRoutes = require("../routes/user");
const restaurantRoutes=require("../routes/restaurant")
const categoryRoutes=require("../routes/category")
const menuRoutes=require("../routes/menu")
const orderRoutes = require('../routes/order');
const orderItemRoutes = require('../routes/orderItem');


app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order', orderItemRoutes);

// Add these lines after your existing routes
const chatRoutes = require('../routes/chat');
const messageRoutes = require('../routes/message');

app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Authenticate socket connection
  socket.on('authenticate', (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      socket.join(`user_${decoded.userId}`); // Join personal room
    } catch (error) {
      console.error('Socket authentication failed:', error);
    }
  });

  socket.on('join_chat', (chatId) => {
    if (socket.userId) {
      socket.join(`chat_${chatId}`);
      console.log(`User ${socket.userId} joined chat ${chatId}`);
    }
  });

  socket.on('leave_chat', (chatId) => {
    socket.leave(`chat_${chatId}`);
    console.log(`User left chat ${chatId}`);
  });

  socket.on('send_message', async (data) => {
    try {
      const { chatId, content } = data;
      
      if (!socket.userId || !chatId || !content) {
        console.error('Invalid message data');
        return;
      }

      const message = await db.Message.create({
        chatId,
        senderId: socket.userId,
        content,
        type: 'TEXT'
      });

      const completeMessage = await db.Message.findOne({
        where: { id: message.id },
        include: [{
          model: db.User,
          as: 'sender',
          attributes: ['id', 'name', 'imageUrl']
        }]
      });

      io.to(`chat_${chatId}`).emit('new_message', completeMessage);

      await db.Chat.update({
        lastMessage: content,
        lastMessageTime: new Date()
      }, {
        where: { id: chatId }
      });
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Add this after your database connection setup
// db.sequelize.sync({ alter: true }).then(() => {
//   console.log('Database synchronized');
// }).catch(err => {
//   console.error('Error synchronizing database:', err);
// });

// Change app.listen to server.listen
server.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

module.exports = { app, server, io };
