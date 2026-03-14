import authReducer, { setAuth, clearAuth, setAuthLoading, setAuthError } from '../redux/authSlice';

describe('authSlice', () => {
    const initialState = {
        user: null,
        token: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    };

    it('should handle setAuth', () => {
        const authData = { user: { email: 'test@example.com' }, token: 'token' };
        const actual = authReducer(initialState, setAuth(authData));
        expect(actual.isAuthenticated).toBe(true);
        expect(actual.user.email).toBe('test@example.com');
        expect(actual.token).toBe('token');
    });

    it('should handle clearAuth', () => {
        const loggedInState = {
            user: { email: 'test@example.com' },
            token: 'token',
            loading: false,
            error: null,
            isAuthenticated: true,
        };
        const actual = authReducer(loggedInState, clearAuth());
        expect(actual.isAuthenticated).toBe(false);
        expect(actual.user).toBeNull();
        expect(actual.token).toBeNull();
    });

    it('should handle setAuthLoading', () => {
        const actual = authReducer(initialState, setAuthLoading(true));
        expect(actual.loading).toBe(true);
    });

    it('should handle setAuthError', () => {
        const actual = authReducer(initialState, setAuthError('test error'));
        expect(actual.error).toBe('test error');
        expect(actual.loading).toBe(false);
    });
});
