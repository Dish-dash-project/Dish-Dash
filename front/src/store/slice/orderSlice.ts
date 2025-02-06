import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  items: OrderItem[];
  loading: boolean;
  error: string | null;
}
interface OrderItem {
  id: number;
  price: number;
  quantity: number;
  menuItemId?: number;
  MenuItem?: {
    name: string;
    imageUrl: string;
  };
    }
const initialState: OrderState = {
  items: [],


  loading: false,
  error: null,
};


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<OrderItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity, setLoading, setError } = orderSlice.actions;

export default orderSlice.reducer; 