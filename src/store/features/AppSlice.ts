import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchServer } from "@/utils/helper";
import { apiRoutes } from "@/utils/apiRoutes";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const initialState = {
  jobTypes: [],
  loading: false,
  imgUrl: "",
};

/**
 * This function is used to fetch job types from the server
 * @author PSK
 * @returns {Promise<Array>} job types data
 */
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
    /**
     * This reducer is used to set job types in the state
     * @author PSK
     * @param {Object} state - The current state
     * @param {Object} action - The action object containing payload
     */
    setJobTypes: (state, action) => {
      state.jobTypes = action.payload;
    },
    setImgUrl: (state, action) => {
      state.imgUrl = action.payload;
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

export const { setJobTypes, setImgUrl } = AppSlice.actions;
export default AppSlice.reducer;
