import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import produtoService from "./produtoService";

export const getProduto = createAsyncThunk(
  "produtos/get-produtos",
  async (thunkAPI) => {
    try {
      return await produtoService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createProduto = createAsyncThunk(
  "produtos/create-produtos",
  async (produtoData, thunkAPI) => {
    try {
      return await produtoService.createProduct(produtoData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  produtos: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const produtoSlice = createSlice({
  name: "produtos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.produtos = action.payload;
      })
      .addCase(getProduto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProduto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProduto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default produtoSlice.reducer;
