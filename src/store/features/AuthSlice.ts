import { createSlice } from "@reduxjs/toolkit";



interface AuthState {
  user: {
    id: number;
    email: string;
    password: string;
  } | null;
  token: string | null;
  verified: boolean;
}
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;
const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
const verified = localStorage.getItem("verified") ? localStorage.getItem("verified") === 'true'  : false;

const initialState: AuthState = {
  user,
  token,
  verified
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
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setVerified: (state, action) => {
      localStorage.setItem("verified", action.payload.toString());
      state.verified = action.payload;
    },
    getToken: (state) => {
      state.token = getT();
    },
    removeToken: (state) => {
      state.token = null;
      state.user = null;
      state.verified = false;
    },
  },
});



export const { setToken, getToken, removeToken, setVerified } = authSlice.actions;
export default authSlice.reducer;