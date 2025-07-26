// src/services/api/Api.ts
import { navigate } from '@/navigation/RootNavRef';
import { showAlert } from '@/store/alert/alerts';
import { updateLogin } from '@/store/auth/session';
import { NODE_URL } from '@/utility/config';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';



const BASE_URL = NODE_URL

// Create an axios instance with React Native specific config
const nodeApi = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Increased timeout for React Native
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor
nodeApi.interceptors.request.use(
  async (config: any) => {
    console.log('URL:', config.baseURL + config.url);
    console.log('Body :', config?.data);

    let xsrfToken = await SecureStore.getItem('csrfToken');
    if (xsrfToken) {
      config.headers['X-CSRF-Token'] = xsrfToken; // Set CSRF token if available
    }

    config.headers = {
      ...config.headers,
      'Cache-Control': 'no-cache',
    };
    return config;
  },
  (error) => {
    console.log('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
nodeApi.interceptors.response.use(
  async (response: any) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {

    // console.log('error000', error)
    console.log('Response error:', error);
    console.log('Error details:', {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response?.data
    });

    const excludeSessionError = [
      '/api/auth/login',
    ]

    // session expired or unauthorized
    if (!excludeSessionError?.includes(error.config?.url) && (error.response?.status === 401 || error.response?.status === 403)) {
      updateLogin(false);
      showAlert({
        type: 'error',
        title: 'Session expired',
        message: 'Please log in again.',
        duration: 2000,
      });
      console.error('Unauthorized access - redirecting to login');
      navigate('login')
    }
    return Promise.reject(error);
  }
);

export default nodeApi;