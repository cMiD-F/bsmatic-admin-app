import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import marcaService from "./marcaService";

export const getMarcas = createAsyncThunk(
  "marca/get-marcas",
  async (thunkAPI) => {
    try {
      return await marcaService.getMarcas();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAMarca = createAsyncThunk(
  "marca/get-marca",
  async (id, thunkAPI) => {
    try {
      return await marcaService.getMarca(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createMarca = createAsyncThunk(
  "marca/create-marca",
  async (marcaData, thunkAPI) => {
    try {
      return await marcaService.createMarca(marcaData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAMarca = createAsyncThunk(
  "marca/update-marca",
  async (marca, thunkAPI) => {
    try {
      return await marcaService.updateMarca(marca);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAMarca = createAsyncThunk(
  "marca/delete-marca",
  async (id, thunkAPI) => {
    try {
      return await marcaService.deleteMarca(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  marcas: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const marcaSlice = createSlice({
  name: "marcas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMarcas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMarcas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.marcas = action.payload;
      })
      .addCase(getMarcas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createMarca.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMarca.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdMarca = action.payload;
      })
      .addCase(createMarca.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAMarca.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAMarca.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.marcaNome = action.payload.title;
      })
      .addCase(getAMarca.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAMarca.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAMarca.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedMarca = action.payload;
      })
      .addCase(updateAMarca.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAMarca.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAMarca.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedMarca = action.payload;
      })
      .addCase(deleteAMarca.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default marcaSlice.reducer;
