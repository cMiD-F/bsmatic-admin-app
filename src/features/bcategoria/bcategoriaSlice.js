import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import bCategoriaService from "./bcategoriaService";


export const getCategorias = createAsyncThunk(
  "blogCategoria/get-categorias",
  async (thunkAPI) => {
    try {
      return await bCategoriaService.getCategoriaBlog();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  bCategorias: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message:"",
};

export const bCategoriaSlice = createSlice({
    name: "bCategorias",
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
          state.bCategorias = action.payload;
        })
        .addCase(getCategorias.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        });
  },
});
export default bCategoriaSlice.reducer;