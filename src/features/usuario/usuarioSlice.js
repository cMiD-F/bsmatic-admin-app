import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usuarioService from "./usuarioServices";

export const getUsuarios = createAsyncThunk(
  "usuario/get-usuarios",
  async (thunkAPI) => {
    try {
      return await usuarioService.getUsuarios();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  usuario: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const usuarioSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsuarios.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsuarios.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.usuario = action.payload;
      })
      .addCase(getUsuarios.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default usuarioSlice.reducer;
