import { useState, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const useAuth = () => {
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    
    return {
      token,
      userId: userId ? parseInt(userId) : null,
      username
    };
  });
  
  const [error, setError] = useState(null);

  const setAuthData = useCallback((token, userId, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('username', username);
    
    setAuthState({
      token,
      userId,
      username
    });
  }, []);

  const login = useCallback(async (credentials) => {
    console.log('Logging in with credentials:', credentials);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
      
      setAuthData(data.token, decodedToken.userId, decodedToken.username);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
      throw error;
    }
  }, [setAuthData]);

  const register = useCallback(async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
      
      setAuthData(data.token, decodedToken.userId, decodedToken.username);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    }
  }, [setAuthData]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    
    setAuthState({
      token: null,
      userId: null,
      username: null
    });
  }, []);

  return {
    isAuthenticated: !!authState.token,
    token: authState.token,
    userId: authState.userId,
    username: authState.username,
    login,
    register,
    logout,
    error
  };
};