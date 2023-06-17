import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import perguntaService from "./perguntasService";



export const getPerguntas = createAsyncThunk(
  "pergunta/get-perguntas",
  async (thunkAPI) => {
    try {
      return await perguntaService.getPerguntas();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  perguntas: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message:"",
};

export const perguntaSlice = createSlice({
    name: "perguntas",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getPerguntas.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getPerguntas.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.perguntas = action.payload;
        })
        .addCase(getPerguntas.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        });
  },
});
export default perguntaSlice.reducer;