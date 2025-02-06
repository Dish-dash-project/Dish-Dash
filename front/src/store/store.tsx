import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authslice';
import chatReducer from './slice/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
