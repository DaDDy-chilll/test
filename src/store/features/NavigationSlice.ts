import { jp } from "@/lang/jp";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  title: jp.dashboard,
  sideBar: true,
  name: localStorage.getItem("name") || "", 
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
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setTitle, setSideBar, setName } = navigationSlice.actions;
export default navigationSlice.reducer;
