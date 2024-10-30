import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/helperTypes";

/**
 * Interface for the authentication state
 * @interface AuthState
 * @property {User | null} user - The user object or null
 * @property {string | null} token - The authentication token or null
 * @property {boolean} forgotPassword - Flag for forgot password
 * @property {boolean | null} verified - Flag for verification status
 * @autor PSK
 */
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

/**
 * This function is used to get the token from local storage
 * @returns {string | null} The token or null if not found
 * @author PSK
 */
const getT = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return token;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * This function is used to set the token and user information
     * @param {AuthState} state - The current state
     * @param {object} action - The action payload containing token and user info
     * @param {string} action.payload.token - The authentication token
     * @param {string} action.payload.email - The user's email
     * @param {string} action.payload.id - The user's id
     * @param {string} action.payload.name - The user's name
     * @param {string} action.payload.code - The user's code
     * @author PSK
     */
    setToken: (state, action) => {
      const { token, email, id, name, code } = action.payload;
      state.token = token;
      state.user = { email, id, name, code };
    },
    /**
     * This function is used to set the verification status
     * @param {AuthState} state - The current state
     * @param {boolean} action.payload - The verification status
     * @author PSK
     */
    setVerified: (state, action) => {
      state.verified = action.payload;
    },
    /**
     * This function is used to get the token and update the state
     * @param {AuthState} state - The current state
     * @author PSK
     */
    getToken: (state) => {
      state.token = getT();
    },
    /**
     * This function is used to remove the token and reset the state
     * @param {AuthState} state - The current state
     * @author PSK
     */
    removeToken: (state) => {
      state.token = null;
      state.user = null;
      state.forgotPassword = false;
      state.verified = null;
    },
    /**
     * This function is used to set the forgot password flag
     * @param {AuthState} state - The current state
     * @param {boolean} action.payload - The forgot password flag
     * @author PSK
     */
    setForgotPassword: (state, action) => {
      state.forgotPassword = action.payload;
    },
  },
});

export const { setToken, removeToken, setForgotPassword, setVerified } =
  authSlice.actions;
export default authSlice.reducer;
