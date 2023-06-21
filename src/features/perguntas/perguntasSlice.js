import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const deleteAPergunta = createAsyncThunk(
  "pergunta/delete-pergunta",
  async (id, thunkAPI) => {
    try {
      return await perguntaService.deletePerguntas(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAPergunta = createAsyncThunk(
  "pergunta/get-pergunta",
  async (id, thunkAPI) => {
    try {
      return await perguntaService.getPergunta(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAPergunta = createAsyncThunk(
  "pergunta/update-pergunta",
  async (enq, thunkAPI) => {
    try {
      return await perguntaService.udpatePerguntas(enq);
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
  message: "",
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
      })
      .addCase(deleteAPergunta.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAPergunta.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedPergunta = action.payload;
      })
      .addCase(deleteAPergunta.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAPergunta.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAPergunta.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pergNome = action.payload.nome;
        state.pergTelefone = action.payload.telefone;
        state.pergEmail = action.payload.email;
        state.pergComentario = action.payload.comentario;
        state.pergStatus = action.payload.status;
      })
      .addCase(getAPergunta.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAPergunta.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAPergunta.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedPergunta = action.payload;
      })
      .addCase(updateAPergunta.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default perguntaSlice.reducer;
