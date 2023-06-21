import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import aplicacaoService from "./aplicacaoService";


export const getAplicacoes = createAsyncThunk(
  "aplicacao/get-aplicacoes",
  async (thunkAPI) => {
    try {
      return await aplicacaoService.getAplicacoes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAplicacao = createAsyncThunk(
  "aplicacao/create-aplicacao",
  async (aplicacaoData, thunkAPI) => {
    try {
      return await aplicacaoService.createAplicacao(aplicacaoData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAplicacao = createAsyncThunk(
  "aplicacao/get-aplicacao",
  async (id, thunkAPI) => {
    try {
      return await aplicacaoService.getAplicacao(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAplicacao = createAsyncThunk(
  "aplicacao/update-aplicacao",
  async (aplicacao, thunkAPI) => {
    try {
      return await aplicacaoService.updateAplicacao(aplicacao);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAplicacao = createAsyncThunk(
  "aplicacao/delete-aplicacao",
  async (id, thunkAPI) => {
    try {
      return await aplicacaoService.deleteAplicacao(id);
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
        .addCase(getAplicacoes.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAplicacoes.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.aplicacoes = action.payload;
        })
        .addCase(getAplicacoes.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(createAplicacao.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createAplicacao.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.createdAplicacao = action.payload;
        })
        .addCase(createAplicacao.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(updateAplicacao.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateAplicacao.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.updatedAplicacao = action.payload;
        })
        .addCase(updateAplicacao.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(getAplicacao.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAplicacao.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.aplicacaoNome = action.payload.title;
        })
        .addCase(getAplicacao.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(deleteAplicacao.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteAplicacao.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.deletedAplicacao = action.payload.title;
        })
        .addCase(deleteAplicacao.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});
export default aplicacaoSlice.reducer;