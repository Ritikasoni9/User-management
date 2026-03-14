import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import booleanReducer from './booleanSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    boolean: booleanReducer,
});

export const STORE = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Optional: disable serializable check for simplicity
        }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof STORE.dispatch;
