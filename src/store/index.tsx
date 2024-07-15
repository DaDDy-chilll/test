import { configureStore } from '@reduxjs/toolkit';
import serviceSlice from './reducer/serviceSlice';
import masterSlice from './reducer/masterSlice';

export const store = configureStore({
  reducer: {
    service: serviceSlice,
    master: masterSlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
