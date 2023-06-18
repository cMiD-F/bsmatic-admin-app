import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pCategoriaService from "./pcategoriaService";

export const getCategorias = createAsyncThunk(
  "produtoCategoria/get-categorias",
  async (thunkAPI) => {
    try {
      return await pCategoriaService.getCategoriaProdutos();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategoria = createAsyncThunk(
  "produtoCategoria/create-categoria",
  async (categoriaData, thunkAPI) => {
    try {
      return await pCategoriaService.createCategoria(categoriaData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  pCategorias: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const pCategoriaSlice = createSlice({
  name: "pCategorias",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategorias.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategorias.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategorias = action.payload;
      })
      .addCase(getCategorias.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCategoria.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategoria.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategoria = action.payload;
      })
      .addCase(createCategoria.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default pCategoriaSlice.reducer;
