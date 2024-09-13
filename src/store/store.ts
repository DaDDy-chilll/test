import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./AuthSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;