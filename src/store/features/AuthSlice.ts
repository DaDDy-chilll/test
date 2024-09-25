import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/helperTypes";
interface AuthState {
  user: User | null;
  token: string | null;
  verified: boolean;
}
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") as string)
  : null;
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
const verified = localStorage.getItem("verified")
  ? localStorage.getItem("verified") === "true"
  : false;

const initialState: AuthState = {
  user,
  token,
  verified,
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
      const { token, email, id } = action.payload;
      console.log(token, email);
      state.token = token;
      state.user = { email, id };
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
      state.verified = false;
      // localStorage.removeItem("token"); // Clear from localStorage
      // localStorage.removeItem("user"); // Clear from localStorage
      // localStorage.removeItem("verified"); // Clear from localStorage
    },
  },
});

export const { setToken, removeToken, setVerified } = authSlice.actions;
export default authSlice.reducer;
