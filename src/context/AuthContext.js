// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { validateToken } from '../auth/tokenUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Memoized token validation
    const checkToken = useCallback(async () => {
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
            setError(err.message);
            localStorage.removeItem('accessToken');
            setAccessToken(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const saveToken = useCallback((token) => {
        try {
            localStorage.setItem('accessToken', token);
            setAccessToken(token);
            setError(null);
        } catch (err) {
            console.error('Error saving token:', err);
            setError('Failed to save access token');
        }
    }, []);

    const clearToken = useCallback(() => {
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

    const value = {
        accessToken,
        loading,
        error,
        saveToken,
        clearToken,
        isAuthenticated: !!accessToken,
        refreshToken: checkToken // Allow manual refresh
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};