import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/helperTypes";
interface AuthState {
  user: User | null;
  token: string | null;
  forgotPassword: boolean;
  verified: boolean | null;
}
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") as string)
  : null;
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const verified = localStorage.getItem("verified")
  ? localStorage.getItem("verified") === "true"
  : null;

const initialState: AuthState = {
  user,
  token,
  verified,
  forgotPassword: false,
};

const getT = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return token;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token, email, id, name } = action.payload;
      state.token = token;
      state.user = { email, id, name };
    },
    setVerified: (state, action) => {
      state.verified = action.payload;
    },
    getToken: (state) => {
      state.token = getT();
    },
    removeToken: (state) => {
      state.token = null;
      state.user = null;
      state.forgotPassword = false;
      state.verified = null;
    },
    setForgotPassword: (state, action) => { 
      state.forgotPassword = action.payload;
    },
  },
});

export const { setToken, removeToken, setForgotPassword, setVerified } = authSlice.actions;
export default authSlice.reducer;
