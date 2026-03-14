import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BooleanState {
    isAppReady: boolean;
    isLoggedIn: boolean;
    isLoading: boolean;
}

const initialState: BooleanState = {
    isAppReady: false,
    isLoggedIn: false,
    isLoading: false,
};

const booleanReducer = {
    setAppReady: (state: BooleanState, action: PayloadAction<boolean>) => {
        state.isAppReady = action.payload;
    },
    setLoggedIn: (state: BooleanState, action: PayloadAction<boolean>) => {
        state.isLoggedIn = action.payload;
    },
    setLoading: (state: BooleanState, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
    },
};

const createBooleanSlice = {
    name: "boolean",
    initialState,
    reducers: booleanReducer,
};

export const booleanSlice = createSlice(createBooleanSlice);
export const { setAppReady, setLoggedIn, setLoading } = booleanSlice.actions;

export default booleanSlice.reducer;
