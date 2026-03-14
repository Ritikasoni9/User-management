import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setAuth, clearAuth, setAuthLoading, setAuthError } from '../redux/authSlice';
import { saveData, removeData, STORAGE_KEYS } from '../utils/storage';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

    const login = async (credentials: any) => {
        dispatch(setAuthLoading(true));
        try {
            // Simulate API call for dummy login
            await new Promise(resolve => setTimeout(resolve, 800));

            if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
                const authData = {
                    user: { email: credentials.email, name: 'Admin User' },
                    token: 'dummy-jwt-token',
                };

                // Save to AsyncStorage manually
                await saveData(STORAGE_KEYS.AUTH, authData);

                // Update Redux
                dispatch(setAuth(authData));
                return true;
            } else {
                dispatch(setAuthError('Invalid credentials'));
                return false;
            }
        } catch (err) {
            dispatch(setAuthError('An error occurred during login'));
            return false;
        }
    };

    const logoutUser = async () => {
        await removeData(STORAGE_KEYS.AUTH);
        dispatch(clearAuth());
    };

    return {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout: logoutUser,
    };
};
