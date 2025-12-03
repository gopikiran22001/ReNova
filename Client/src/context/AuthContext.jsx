import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const { data } = await api.get('/auth/me');
                if (data.success) {
                    setUser(data.data.user);
                }
            } catch (error) {
                // Not logged in or error occurred
                console.log('Auth check failed:', error.response?.data?.message || error.message);
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            if (data.success) {
                setUser(data.data.user);

                // Redirect based on role
                if (data.data.user.role === 'admin') navigate('/admin/dashboard');
                else if (data.data.user.role === 'collector') navigate('/collector/dashboard');
                else navigate('/citizen/dashboard');

                return { success: true };
            } else {
                return {
                    success: false,
                    message: data.message || 'Login failed'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await api.post('/auth/register', userData);
            if (data.success) {
                setUser(data.data.user);
                
                // Redirect based on role
                if (data.data.user.role === 'admin') navigate('/admin/dashboard');
                else if (data.data.user.role === 'collector') navigate('/collector/dashboard');
                else navigate('/citizen/dashboard');
                
                return { success: true };
            } else {
                return {
                    success: false,
                    message: data.message || 'Registration failed'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
            // Still clear user state even if logout request fails
            setUser(null);
            navigate('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
