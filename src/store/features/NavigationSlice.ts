import { jp } from "@/lang/jp";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  title: jp.dashboard,
  sideBar: true,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      console.log(action.payload);
      state.title = action.payload;
    },
    setSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
  },
});

export const { setTitle, setSideBar } = navigationSlice.actions;
export default navigationSlice.reducer;
