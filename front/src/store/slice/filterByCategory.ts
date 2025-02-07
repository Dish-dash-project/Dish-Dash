import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface FilterByCategoryState {
  filteredProducts: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FilterByCategoryState = {
  filteredProducts: [],
  loading: false,
  error: null,
};

export const fetchProductsByCategory = createAsyncThunk(
  'filterByCategory/fetchProducts',
  async (categoryId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/menu/${categoryId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

const filterByCategorySlice = createSlice({
  name: 'filterByCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default filterByCategorySlice.reducer;