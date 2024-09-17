import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./features/AuthSlice";
import {navigationSlice} from "./features/NavigationSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        navigation: navigationSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;