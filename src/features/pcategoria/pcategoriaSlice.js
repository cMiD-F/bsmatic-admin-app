import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pcategoriaService from "./pcategoriaService";

export const getCategorias = createAsyncThunk(
  "produtoCategoria/get-categorias",
  async (thunkAPI) => {
    try {
      return await pcategoriaService.getCategoriaProdutos();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCategoria = createAsyncThunk(
  "produtoCategoria/create-categoria",
  async (categoriaData, thunkAPI) => {
    try {
      return await pcategoriaService.createCategoria(categoriaData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAProdutoCategoria = createAsyncThunk(
  "produtoCategoria/update-categoria",
  async (categoria, thunkAPI) => {
    try {
      return await pcategoriaService.updateCategoriaProduto(categoria);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAProdutoCategoria = createAsyncThunk(
  "produtoCategoria/delete-categoria",
  async (id, thunkAPI) => {
    try {
      return await pcategoriaService.deleteCategoriaProduto(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAProdutoCategoria = createAsyncThunk(
  "produtoCategoria/get-produto-categoria",
  async (id, thunkAPI) => {
    try {
      return await pcategoriaService.getCategoriaProduto(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("RevertAll");

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
      .addCase(updateAProdutoCategoria.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAProdutoCategoria.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategoria = action.payload;
      })
      .addCase(updateAProdutoCategoria.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAProdutoCategoria.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProdutoCategoria.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategoria = action.payload;
      })
      .addCase(deleteAProdutoCategoria.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAProdutoCategoria.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProdutoCategoria.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoriaNome = action.payload.title;
      })
      .addCase(getAProdutoCategoria.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default pCategoriaSlice.reducer;
