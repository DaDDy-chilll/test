import { jp } from "@/lang/jp";
import { createSlice } from "@reduxjs/toolkit";

type NotificationType = { [chatId: string]: number };

const initialState = {
  title: jp.dashboard,
  sideBar: true,
  name: localStorage.getItem("name") || "",
  notification: {} as NotificationType,
};



export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setNotification: (state, action) => {
      console.log('action',action);
      state.notification = action.payload;
    },
  },
});

export const { setTitle, setSideBar, setName, setNotification } =
  navigationSlice.actions;
export default navigationSlice.reducer;
