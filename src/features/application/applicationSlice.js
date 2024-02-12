import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import applicationService from "./applicationService";

export const getApplications = createAsyncThunk(
  "application/get-applications",
  async (thunkAPI) => {
    try {
      return await applicationService.getApplications();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createApplication = createAsyncThunk(
  "application/create-application",
  async (applicationData, thunkAPI) => {
    try {
      return await applicationService.createApplication(applicationData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAApplication = createAsyncThunk(
  "application/get-application",
  async (id, thunkAPI) => {
    try {
      return await applicationService.getApplication(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAApplication = createAsyncThunk(
  "application/update-application",
  async (application, thunkAPI) => {
    try {
      return await applicationService.updateApplication(application);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAApplication = createAsyncThunk(
  "application/delete-application",
  async (id, thunkAPI) => {
    try {
      return await applicationService.deleteApplication(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  applications: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.applications = action.payload;
      })
      .addCase(getApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdApplication = action.payload;
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedApplication = action.payload;
      })
      .addCase(updateAApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.applicationName = action.payload.title;
      })
      .addCase(getAApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedApplication = action.payload.title;
      })
      .addCase(deleteAApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default applicationSlice.reducer;
