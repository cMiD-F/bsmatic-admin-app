import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import cupomService from "./cupomService";

export const getAllCupom = createAsyncThunk(
  "cupom/get-cupons",
  async (thunkAPI) => {
    try {
      return await cupomService.getCupons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCupom = createAsyncThunk(
  "cupom/create-cupom",
  async (cupomData, thunkAPI) => {
    try {
      return await cupomService.createCupons(cupomData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteACupom = createAsyncThunk(
  "cupom/delete-cupom",
  async (id, thunkAPI) => {
    try {
      return await cupomService.deleteCupom(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACupom = createAsyncThunk(
  "cupom/get-cupom",
  async (id, thunkAPI) => {
    try {
      return await cupomService.getCupom(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateACupom = createAsyncThunk(
  "cupom/update-cupom",
  async (cupom, thunkAPI) => {
    try {
      return await cupomService.updateCupom(cupom);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  cupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const couponSlice = createSlice({
  name: "cupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCupom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCupom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cupons = action.payload;
      })
      .addCase(getAllCupom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCupom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCupom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCupom = action.payload;
      })
      .addCase(createCupom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACupom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACupom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCupom = action.payload;
      })
      .addCase(deleteACupom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACupom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACupom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cupomNome = action.payload[0].nome;
        state.cupomDesconto = action.payload[0].desconto;
        state.cupomExpiracao = action.payload[0].expiracao;
      })
      .addCase(getACupom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateACupom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACupom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cupomNome = action.payload[0].nome;
        state.cupomDesconto = action.payload[0].desconto;
        state.cupomExpiracao = action.payload[0].expiracao;
      })
      .addCase(updateACupom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
