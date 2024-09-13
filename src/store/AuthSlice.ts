import { createSlice } from "@reduxjs/toolkit";



interface AuthState {
  user: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
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
      state.token = action.payload;
    },
    getToken: (state) => {
      state.token = getT();
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});



export const { setToken, getToken, removeToken } = authSlice.actions;
export default authSlice.reducer;