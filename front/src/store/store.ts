import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authslice';
import chatReducer from './slice/chatSlice';
import customerReducer from './slice/customerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    customers: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 