import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import produtoService from "./produtoService"

export const getProduto = createAsyncThunk(
  "produto/get-produtos",
  async (thunkAPI) => {
    try {
      return await produtoService.getProduto();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  produtos: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message:"",
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
      });
  },
});
export default produtoSlice.reducer;