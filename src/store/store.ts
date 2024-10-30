import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

/**
 * Configuration object for redux-persist
 * @author PSK
 * @type {Object}
 * @property {string} key - The key for the persisted state
 * @property {Object} storage - The storage engine to use
 * @property {Array<string>} whitelist - The list of reducers to persist
 */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "navigation"],
};

/**
 * Create a persisted reducer using the persistConfig and rootReducer
 * @author PSK
 * @param {Object} persistConfig - The configuration object for redux-persist
 * @param {Function} rootReducer - The root reducer function
 * @returns {Function} The persisted reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configure and create the Redux store with persisted reducer and middleware
 * @author PSK
 * @returns {Object} The configured Redux store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore this action for the check
      },
    }),
});

/**
 * Create a persistor for the store
 * @author PSK
 * @param {Object} store - The Redux store
 * @returns {Object} The persistor
 */
export const persistor = persistStore(store);

/**
 * Type definition for the root state
 * @author PSK
 * @typedef {Object} RootState
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type definition for the app dispatch
 * @author PSK
 * @typedef {Function} AppDispatch
 */
export type AppDispatch = typeof store.dispatch;
