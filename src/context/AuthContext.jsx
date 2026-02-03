import { createContext, useState, useEffect } from 'react';
import authService from '../features/auth/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const userFromStorage = JSON.parse(localStorage.getItem('user'));
        if (userFromStorage) {
            setUser(userFromStorage);
        }
    }, []);

    const register = async (user) => {
        setIsLoading(true);
        try {
            const data = await authService.register(user);
            setUser(data);
            setIsSuccess(true);
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || error.message);
        }
        setIsLoading(false);
    };

    const login = async (user) => {
        setIsLoading(true);
        try {
            const data = await authService.login(user);
            setUser(data);
            setIsSuccess(true);
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || error.message);
        }
        setIsLoading(false);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const reset = () => {
        setIsLoading(false);
        setIsSuccess(false);
        setIsError(false);
        setMessage('');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isError,
                isSuccess,
                message,
                register,
                login,
                logout,
                reset,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
