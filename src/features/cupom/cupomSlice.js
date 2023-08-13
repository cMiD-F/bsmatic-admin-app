import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import cupomService from "./cupomService";

export const getAllCoupon = createAsyncThunk(
  "cupom/get-cupons",
  async (thunkAPI) => {
    try {
      return await cupomService.getCupons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCoupon = createAsyncThunk(
  "cupom/create-cupom",
  async (cupomData, thunkAPI) => {
    try {
      return await cupomService.createCupons(cupomData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteACoupon = createAsyncThunk(
  "cupom/delete-cupom",
  async (id, thunkAPI) => {
    try {
      return await cupomService.deleteCupom(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACoupon = createAsyncThunk(
  "cupom/get-cupom",
  async (id, thunkAPI) => {
    try {
      return await cupomService.getCupom(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateACoupon = createAsyncThunk(
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
export const cupomSlice = createSlice({
  name: "cupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cupons = action.payload;
      })
      .addCase(getAllCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCoupon = action.payload;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCoupon = action.payload;
      })
      .addCase(deleteACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cupomNome = action.payload[0].nome;
        state.cupomDesconto = action.payload[0].desconto;
        state.cupomExpiracao = action.payload[0].expiracao;
      })
      .addCase(getACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cupomNome = action.payload[0].nome;
        state.cupomDesconto = action.payload[0].desconto;
        state.cupomExpiracao = action.payload[0].expiracao;
      })
      .addCase(updateACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default cupomSlice.reducer;
