import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface CategoryState {
  categories: Array<{ imageUrl: string; name: string; id: number }>;
  loading: boolean;
  error: string | null;
  selectedCategoryId: number | null; // Add this line

}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  selectedCategoryId: null, // Add this line
};


export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const response = await axios.get('http://localhost:3000/api/category/');
    return response.data;
  }
);

export const fetchCategoryById = createAsyncThunk(
  'category/fetchCategoryById',
  async (id: number) => {
    const response = await axios.get(`http://localhost:3000/api/menu/${id}`);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {

        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.selectedCategoryId = action.payload.id; // Update this line
        state.loading = false;
      });
  },
});
export const { setSelectedCategory } = categorySlice.actions; // Add this line

export default categorySlice.reducer;