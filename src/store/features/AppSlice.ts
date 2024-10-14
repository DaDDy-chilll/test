import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchServer } from "@/utils/helper";
import { apiRoutes } from "@/utils/apiRoutes";
import { RootState } from "../store";
import { useSelector } from "react-redux";
const initialState = {
  jobTypes: [],
  loading: false,
};

export const fetchJobTypes = createAsyncThunk("app/fetchJobTypes", async () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const response = await fetchServer({
    endpoint: apiRoutes.JOB_TYPES,
    method: "GET",
    token: token as string,
  });
  return response.data;
});

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setJobTypes: (state, action) => {
      state.jobTypes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchJobTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.jobTypes = action.payload;
    });
    builder.addCase(fetchJobTypes.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setJobTypes } = AppSlice.actions;
export default AppSlice.reducer;
