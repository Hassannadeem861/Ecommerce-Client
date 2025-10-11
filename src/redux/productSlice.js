import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../utils/product-api";

// async thunk
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await getAllProducts();
    return res?.rows; 
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default productSlice.reducer;
