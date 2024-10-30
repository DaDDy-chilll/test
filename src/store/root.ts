import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./features/AuthSlice";
import { navigationSlice } from "./features/NavigationSlice";
import appSlice from "./features/AppSlice";

/**
 * Combines all the reducers into a single root reducer
 * @author PSK
 * @returns {object} The combined reducer object
 */
export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  navigation: navigationSlice.reducer,
  app: appSlice,
});
