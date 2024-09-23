import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./features/AuthSlice";
import { navigationSlice } from "./features/NavigationSlice";

export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    navigation: navigationSlice.reducer,
});