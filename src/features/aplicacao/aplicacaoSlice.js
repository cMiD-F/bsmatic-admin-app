import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import aplicacaoService from "./aplicacaoService";


export const getAplicacao = createAsyncThunk(
  "aplicacao/get-aplicacoes",
  async (thunkAPI) => {
    try {
      return await aplicacaoService.getAplicacao();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  aplicacoes: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message:"",
};

export const aplicacaoSlice = createSlice({
    name: "aplicacoes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAplicacao.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAplicacao.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.aplicacoes = action.payload;
        })
        .addCase(getAplicacao.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        });
  },
});
export default aplicacaoSlice.reducer;