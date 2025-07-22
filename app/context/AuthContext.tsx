import { login as loginApi, register as registerApi } from '@/api/nodeapi/Auth/api';
import { AuthStore, useAuthStore } from '@/store/auth/authStore';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';


interface AuthContextType {
  userLoggedIn: boolean;
  userDetails: AuthStore['userDetails'] | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email: string, phonenumber: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { userLoggedIn, setUserLoggedIn, userDetails, setUserDetails } = useAuthStore();

  useEffect(() => {
    (async () => {
      const storedToken = await SecureStore.getItemAsync('token');
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedUser && storedToken) {
        setUserDetails(JSON.parse(storedUser));
        setUserLoggedIn(true);
      }
      setLoading(false);
    })();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await loginApi({ username, password });
      console.log('res---', res)
      if (res?.token) {
        await SecureStore.setItemAsync('token', res.token);
        await SecureStore.setItemAsync('csrfToken', res?.csrfToken);
        let userDetails = {
          currencyCode: "INR",
          currencySymbol: "₹",
          language: "en",
          ...res?.user
        }
        await SecureStore.setItemAsync('user', JSON.stringify(userDetails));
        setUserDetails(userDetails);
        setUserLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (username: string, password: string, email: string, phonenumber: string): Promise<boolean> => {
    try {
      const res = await registerApi({ username, password, email, phonenumber, role: 'user' });
      if (res?.token) {
        await SecureStore.setItemAsync('token', res.token);
        await SecureStore.setItemAsync('user', JSON.stringify(res.user));
        setUserDetails(res?.user);
        setUserLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
    setUserLoggedIn(false);
    setTimeout(() => {
      setUserDetails(null);
    }, 100);
  };

  return (
    <AuthContext.Provider value={{ userLoggedIn, userDetails, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};