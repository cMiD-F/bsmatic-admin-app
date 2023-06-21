import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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
export const createNewblogCat = createAsyncThunk(
  "blogCategoria/create-categoria",
  async (catData, thunkAPI) => {
    try {
      return await bCategoriaService.createBlogCategoria(catData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlogCat = createAsyncThunk(
  "blogCategoria/get-categoria",
  async (id, thunkAPI) => {
    try {
      return await bCategoriaService.getBlogCategoria(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateABlogCat = createAsyncThunk(
  "blogCategoria/update-categoria",
  async (blogCat, thunkAPI) => {
    try {
      return await bCategoriaService.updateBlogCategoria(blogCat);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABlogCat = createAsyncThunk(
  "blogCategoria/delete-categoria",
  async (id, thunkAPI) => {
    try {
      return await bCategoriaService.deleteBlogCategoria(id);
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
  message: "",
  createBlogCategoria: null,
};
export const pCategoriaSlice = createSlice({
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
      })
      .addCase(createNewblogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewblogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createBlogCategoria = action.payload;
      })
      .addCase(createNewblogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCatName = action.payload.title;
      })
      .addCase(getABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlogCategory = action.payload;
      })
      .addCase(updateABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlogCategoria = action.payload;
      })
      .addCase(deleteABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default pCategoriaSlice.reducer;
