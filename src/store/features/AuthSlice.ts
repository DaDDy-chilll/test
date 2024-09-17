import { createSlice } from "@reduxjs/toolkit";



interface AuthState {
  user: {
    email: string;
    password: string;
  } | null;
  token: string | null;
}
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;
const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const initialState: AuthState = {
  user,
  token,
};

const getT = () => {
  const token =  localStorage.getItem("token");
  if(!token) return null;
  return token;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    getToken: (state) => {
      state.token = getT();
    },
    removeToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});



export const { setToken, getToken, removeToken } = authSlice.actions;
export default authSlice.reducer;