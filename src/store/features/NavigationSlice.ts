import { jp } from "@/lang/jp";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  title: jp.dashboard,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setTitle: (state, action) => state.title = action.payload,
  },
});

export const { setTitle } = navigationSlice.actions;
export default navigationSlice.reducer;
