// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { validateToken } from '../auth/tokenUtils';
import { AuthContextType } from '../types/portfolio';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Memoized token validation
    const checkToken = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('accessToken');
            if (!token) {
                setLoading(false);
                return;
            }

            const valid = await validateToken(token);
            if (valid) {
                setAccessToken(token);
            } else {
                localStorage.removeItem('accessToken');
                setAccessToken(null);
            }
        } catch (err) {
            console.error('Token validation error:', err);
            setError((err as Error).message);
            localStorage.removeItem('accessToken');
            setAccessToken(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const saveToken = useCallback((token: string): void => {
        try {
            localStorage.setItem('accessToken', token);
            setAccessToken(token);
            setError(null);
        } catch (err) {
            console.error('Error saving token:', err);
            setError('Failed to save access token');
        }
    }, []);

    const clearToken = useCallback((): void => {
        try {
            localStorage.removeItem('accessToken');
            setAccessToken(null);
            setError(null);
        } catch (err) {
            console.error('Error clearing token:', err);
            setError('Failed to clear access token');
        }
    }, []);

    useEffect(() => {
        checkToken();
    }, [checkToken]);

    const value: AuthContextType = {
        accessToken,
        loading,
        error,
        saveToken,
        clearToken,
        isAuthenticated: !!accessToken,
        refreshToken: checkToken
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};