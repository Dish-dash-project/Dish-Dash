import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';



// Define a Product Type
interface Product {
  id: number;
  name: string;
  description: string;
}

// Define Initial State Type
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filteredProducts: Product[]|[];
  product: Product | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  filteredProducts: [],
  product: null,
};

// Fetch all products (API call)
export const filterProduct = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'product/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await (await axios.get(`http://localhost:3000/api/menu/`))
      return response.data; // Ensure you're returning the data here

    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const productSlice = createSlice({
  name: 'cool',
  initialState,
  reducers: {
    // This reducer will filter the products based on the query
    filterProductByQuery: (state, action: PayloadAction<string>) => {
 
  
      const query = action.payload.toLowerCase();
      state.filteredProducts = query
      

        ? state.products.filter(
            (product) =>
              product.name.toLowerCase().includes(query) || // Filter by product name
              product.description.toLowerCase().includes(query) // Filter by description
          )
        : state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(filterProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

export const { filterProductByQuery } = productSlice.actions;
export default productSlice.reducer;
