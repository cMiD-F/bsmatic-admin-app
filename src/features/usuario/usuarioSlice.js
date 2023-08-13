import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usuarioService from "./usuarioService";

export const getUsers = createAsyncThunk(
  "usuario/get-usuarios",
  async (thunkAPI) => {
    try {
      return await usuarioService.getUsers();
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
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.usuario = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default usuarioSlice.reducer;
