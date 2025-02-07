import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface AdvancedSearchState {
  results: any[];
  loading: boolean;
  error: string | null;
}

// Initial state for the advanced search
const initialState: AdvancedSearchState = {
  results: [],
  loading: false,
  error: null,
};

// Async thunk for performing advanced search
export const advancedSearch = createAsyncThunk(
  'advancedSearch/search',
  async ({ menuName, categoryId }: { menuName?: string; categoryId?: number }) => {
    const response = await axios.get('http://localhost:3000/api/advanced-search', {
      params: { menuName, categoryId }
    });
    return response.data; // Return the data directly
  }
);

// Slice for advanced search
const advancedSearchSlice = createSlice({
  name: 'advancedSearch',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
      state.error = null; // Clear previous error messages
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(advancedSearch.pending, (state) => {
        state.loading = true; // Set loading to true when search starts
        state.error = null; // Clear any previous errors
      })
      .addCase(advancedSearch.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when search completes
        state.results = action.payload; // Store the results from the API
      })
      .addCase(advancedSearch.rejected, (state, action) => {
        state.loading = false; // Set loading to false when search fails
        state.error = action.error.message || 'Search failed'; // Capture the error message
      });
  },
});

// Export the action to clear search results
export const { clearSearchResults } = advancedSearchSlice.actions;

// Export the reducer
export default advancedSearchSlice.reducer;