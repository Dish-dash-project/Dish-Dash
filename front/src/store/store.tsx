import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authslice';
import filterProductByQuery from './slice/filterProductByQuery.ts';
import orderReducer from './slice/orderSlice.ts';
import categoryReducer from './slice/categorySlice.ts';
import chatReducer from './slice/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filterProductByQuery:filterProductByQuery,
    order: orderReducer ,
    category:categoryReducer,
    chat: chatReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
