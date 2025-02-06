import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Message {
  id: string;
  content: string;
  senderId: number;
  chatId: string;
  createdAt: string;
  sender: {
    id: number;
    name: string;
    imageUrl?: string;
  };
}

interface Chat {
  id: string;
  name: string | null;
  type: 'DIRECT' | 'GROUP';
  lastMessage: string | null;
  lastMessageTime: string | null;
  participants: {
    id: number;
    name: string;
    imageUrl?: string;
  }[];
  messages: Message[];
  unreadCount: number;
}

interface ChatState {
  chats: Chat[];
  activeChat: string | null;
  isLoading: boolean;
  error: string | null;
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/chats');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch chats');
    }
  }
);

export const createChat = createAsyncThunk(
  'chat/createChat',
  async (data: { participantIds: number[]; type?: 'DIRECT' | 'GROUP'; name?: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/chats', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create chat');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (data: { chatId: string; content: string; type?: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/messages', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (chatId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/messages/chat/${chatId}`);
      return { chatId, messages: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch messages');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    activeChat: null,
    isLoading: false,
    error: null,
  } as ChatState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find(c => c.id === chatId);
      if (chat) {
        chat.messages.push(message);
        chat.lastMessage = message.content;
        chat.lastMessageTime = message.createdAt;
      }
    },
    markMessagesAsRead: (state, action) => {
      const chatId = action.payload;
      const chat = state.chats.find(c => c.id === chatId);
      if (chat) {
        chat.unreadCount = 0;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.chats.push(action.payload);
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const chat = state.chats.find(c => c.id === action.payload.chatId);
        if (chat) {
          chat.messages.push(action.payload);
          chat.lastMessage = action.payload.content;
          chat.lastMessageTime = action.payload.createdAt;
        }
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const chat = state.chats.find(c => c.id === action.payload.chatId);
        if (chat) {
          chat.messages = action.payload.messages;
        }
      });
  },
});

export const { setActiveChat, addMessage, markMessagesAsRead } = chatSlice.actions;
export default chatSlice.reducer; 