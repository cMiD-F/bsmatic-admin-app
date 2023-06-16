import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import produtoService from "./produtoService";

export const getProdutos = createAsyncThunk(
  "produtos/get-produtos",
  async (thunkAPI) => {
    try {
      return await produtoService.getProdutos();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProdutos = createAsyncThunk(
    "produtos/create-produtos",
    async (produtoData, thunkAPI) => {
        try {
            return await produtoService.createProduto(produtoData);
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
      .addCase(getProdutos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProdutos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.produtos = action.payload;
      })
      .addCase(getProdutos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProdutos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProdutos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createProduto = action.payload;
      })
      .addCase(createProdutos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default produtoSlice.reducer;
