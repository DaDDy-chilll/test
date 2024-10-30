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
    /**
     * This function is used to set the title in the state
     * @author PSK
     * @param {Object} state - The current state of the slice
     * @param {Object} action - The action object containing the payload
     */
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    /**
     * This function is used to toggle the sideBar state
     * @author PSK
     * @param {Object} state - The current state of the slice
     */
    setSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
    /**
     * This function is used to set the name in the state
     * @author PSK
     * @param {Object} state - The current state of the slice
     * @param {Object} action - The action object containing the payload
     */
    setName: (state, action) => {
      state.name = action.payload;
    },
    /**
     * This function is used to set the notification in the state
     * @author PSK
     * @param {Object} state - The current state of the slice
     * @param {Object} action - The action object containing the payload
     */
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setTitle, setSideBar, setName, setNotification } =
  navigationSlice.actions;
export default navigationSlice.reducer;
