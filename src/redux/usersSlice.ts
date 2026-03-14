import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersState } from './rootState';

const initialState: UsersState & { refreshing: boolean } = {
    list: [],
    userDetail: null,
    page: 1,
    totalPages: 1,
    loading: true,
    refreshing: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<{ data: any[]; page: number; total_pages: number; replace?: boolean }>) => {
            state.list = (action.payload.page === 1 || action.payload.replace)
                ? action.payload.data
                : [...state.list, ...action.payload.data];
            state.page = action.payload.page;
            state.totalPages = action.payload.total_pages;
            state.loading = false;
            state.refreshing = false;
            state.error = null;
        },
        setUsersRefreshing: (state, action: PayloadAction<boolean>) => {
            state.refreshing = action.payload;
        },
        setUserDetail: (state, action: PayloadAction<any>) => {
            state.userDetail = action.payload;
            state.loading = false;
            state.error = null;
        },
        appendUser: (state, action: PayloadAction<any>) => {
            state.list = [action.payload, ...state.list];
            state.loading = false;
        },
        updateUserInList: (state, action: PayloadAction<any>) => {
            const index = state.list.findIndex((u: any) => u.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = { ...state.list[index], ...action.payload };
            }
            state.loading = false;
        },
        setUsersLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setUsersError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
        resetUsersState: (state) => {
            state.list = [];
            state.page = 1;
            state.totalPages = 1;
            state.error = null;
        },
    },
});

export const {
    setUsers,
    setUsersRefreshing,
    setUserDetail,
    appendUser,
    updateUserInList,
    setUsersLoading,
    setUsersError,
    resetUsersState
} = usersSlice.actions;

export default usersSlice.reducer;
