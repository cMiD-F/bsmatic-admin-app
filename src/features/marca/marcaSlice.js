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
      .addCase(resetState, () => initialState);
  },
});
export default marcaSlice.reducer;
