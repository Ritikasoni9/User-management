import { renderHook, act } from '@testing-library/react-native';
import { useUsers } from '../hooks/useUsers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersApi, createUserApi, updateUserApi } from '../services/userService';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('../services/userService', () => ({
    fetchUsersApi: jest.fn(),
    createUserApi: jest.fn(),
    updateUserApi: jest.fn(),
}));

jest.mock('../utils/storage', () => ({
    saveData: jest.fn(),
    loadData: jest.fn(),
    STORAGE_KEYS: { USERS: 'users_cache' },
}));

describe('useUsers hook', () => {
    const mockDispatch = jest.fn();
    const mockUsers = [{ id: 1, first_name: 'John' }];

    beforeEach(() => {
        jest.clearAllMocks();
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
        (useSelector as unknown as jest.Mock).mockReturnValue({
            list: mockUsers,
            page: 1,
            totalPages: 2,
            loading: false,
            error: null,
        });
    });

    it('should handle refreshUsers', async () => {
        const mockApiResponse = { data: mockUsers, total_pages: 5 };
        (fetchUsersApi as unknown as jest.Mock).mockResolvedValue(mockApiResponse);

        const { result } = renderHook(() => useUsers());

        await act(async () => {
            await result.current.refreshUsers();
        });

        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'users/setUsersLoading' }));
        expect(fetchUsersApi).toHaveBeenCalledWith(1);
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: 'users/setUsers',
            payload: { data: mockUsers, page: 1, total_pages: 5 }
        }));
    });

    it('should handle loadMore', async () => {
        const mockApiResponse = { data: [{ id: 2, first_name: 'Jane' }], total_pages: 5 };
        (fetchUsersApi as unknown as jest.Mock).mockResolvedValue(mockApiResponse);

        const { result } = renderHook(() => useUsers());

        await act(async () => {
            await result.current.loadMore();
        });

        expect(fetchUsersApi).toHaveBeenCalledWith(2);
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: 'users/setUsers',
            payload: { data: mockApiResponse.data, page: 2, total_pages: 5 }
        }));
    });

    it('should handle addUser', async () => {
        const newUser = { first_name: 'New' };
        (createUserApi as unknown as jest.Mock).mockResolvedValue({ id: 99, ...newUser });

        const { result } = renderHook(() => useUsers());

        let success;
        await act(async () => {
            success = await result.current.addUser(newUser);
        });

        expect(success).toBe(true);
        expect(createUserApi).toHaveBeenCalledWith(newUser);
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'users/appendUser' }));
    });
});
