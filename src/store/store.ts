import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./AuthSlice";
import {navigationSlice} from "./NavigationSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        navigation: navigationSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;