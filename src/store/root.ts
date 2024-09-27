import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./features/AuthSlice";
import { navigationSlice } from "./features/NavigationSlice";
import appSlice  from "./features/AppSlice";
export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    navigation: navigationSlice.reducer,
    app: appSlice,
});