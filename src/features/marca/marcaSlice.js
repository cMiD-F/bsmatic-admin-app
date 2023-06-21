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

export const getAmarca = createAsyncThunk(
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
  "marca/createMarca",
  async (marcaData, { rejectWithValue }) => {
    try {
      const response = await marcaService.createMarca(marcaData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAmarca = createAsyncThunk(
  "marca/update-marca",
  async (marca, thunkAPI) => {
    try {
      return await marcaService.updateMarca(marca);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAmarca = createAsyncThunk(
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
      .addCase(getAmarca.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAmarca.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.marcaNome = action.payload.title;
      })
      .addCase(getAmarca.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAmarca.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAmarca.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedMarca = action.payload;
      })
      .addCase(updateAmarca.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAmarca.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAmarca.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedMarca = action.payload;
      })
      .addCase(deleteAmarca.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default marcaSlice.reducer;
