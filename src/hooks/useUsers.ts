import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
    setUsers,
    setUsersRefreshing,
    setUsersLoading,
    setUsersError,
    resetUsersState,
    appendUser,
    updateUserInList
} from '../redux/usersSlice';
import { fetchUsersApi, createUserApi, updateUserApi } from '../services/userService';
import { saveData, loadData, STORAGE_KEYS } from '../utils/storage';

export const useUsers = () => {
    const dispatch = useDispatch();
    const { list: users, page, totalPages, loading, refreshing, error } = useSelector((state: RootState) => state.users);

    const syncToStorage = useCallback(async (data: any[]) => {
        try {
            await saveData(STORAGE_KEYS.USERS, data);
        } catch (e) {
            console.error('Failed to sync users to storage', e);
        }
    }, []);

    const fetchPage = useCallback(async (targetPage: number = 1, isRefresh: boolean = false) => {
        if (isRefresh) {
            dispatch(resetUsersState()); // Clear old state immediately
            dispatch(setUsersRefreshing(true));
        } else {
            dispatch(setUsersLoading(true));
        }

        // Add 1s delay so the loader is visible
        await new Promise(resolve => setTimeout(resolve, 1000));

        const cachedData = await loadData(STORAGE_KEYS.USERS) || [];
        const pageSize = 5;

        // CRITICAL FIX: Even on first load/refresh, we must SLICE the data
        // to only show the first 5 records.
        if (cachedData.length > 0) {
            const start = (targetPage - 1) * pageSize;
            const end = start + pageSize;
            const pageData = cachedData.slice(start, end);

            dispatch(setUsers({
                data: pageData,
                page: targetPage,
                total_pages: Math.ceil(cachedData.length / pageSize),
                replace: isRefresh // replace for refresh, append for loadMore
            }));
            return;
        }

        try {
            // Only if cache is empty
            const response = await fetchUsersApi(targetPage, pageSize);
            dispatch(setUsers({
                data: response.data,
                page: targetPage,
                total_pages: response.total_pages,
                replace: isRefresh
            }));
            if (targetPage === 1) await syncToStorage(response.data);
        } catch (err: any) {
            dispatch(setUsersError('No records found.'));
        }
    }, [dispatch, syncToStorage]);

    const refreshUsers = useCallback(() => {
        fetchPage(1, true);
    }, [fetchPage]);

    const loadMore = useCallback(async () => {
        if (page < totalPages && !loading && !refreshing) {
            await fetchPage(page + 1);
        }
    }, [fetchPage, page, totalPages, loading, refreshing]);

    // Cleanup initial loading state if needed
    useEffect(() => {
        if (loading && users.length === 0 && !refreshing) {
            const timer = setTimeout(() => {
                if (loading && users.length === 0) {
                    dispatch(setUsersLoading(false));
                }
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [loading, users.length, refreshing, dispatch]);

    const addUser = async (userData: any) => {
        dispatch(setUsersLoading(true));
        try {
            const response = await createUserApi(userData);
            const newUser = { ...response, id: response.id || Math.floor(Math.random() * 1000) };
            dispatch(appendUser(newUser));
            await syncToStorage([newUser, ...users]);
            return true;
        } catch (err: any) {
            console.warn('addUser API Failed, using local fallback:', err.message);
            const mockNewUser = {
                ...userData,
                id: Math.floor(Math.random() * 1000) + 100,
                avatar: userData.avatar || 'https://reqres.in/img/faces/1-image.jpg'
            };
            dispatch(appendUser(mockNewUser));
            await syncToStorage([mockNewUser, ...users]);
            return true;
        }
    };

    const editUser = async (id: number, userData: any) => {
        dispatch(setUsersLoading(true));
        try {
            const response = await updateUserApi(id, userData);
            const updatedUser = { id, ...response };
            dispatch(updateUserInList(updatedUser));
            const newList = users.map(u => u.id === id ? { ...u, ...updatedUser } : u);
            await syncToStorage(newList);
            return true;
        } catch (err: any) {
            console.warn('editUser API Failed, using local fallback:', err.message);
            const updatedLocal = { id, ...userData };
            dispatch(updateUserInList(updatedLocal));
            const newList = users.map(u => u.id === id ? { ...u, ...updatedLocal } : u);
            await syncToStorage(newList);
            return true;
        }
    };

    return {
        users,
        loading,
        refreshing,
        error,
        page,
        totalPages,
        refreshUsers,
        loadMore,
        fetchPage,
        addUser,
        editUser,
        reset: () => dispatch(resetUsersState()),
    };
};
