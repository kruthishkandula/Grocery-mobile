// src/services/api/Api.ts
import { CMS_TOKEN, CMS_URL } from '@/utility/config';
import axios from 'axios';

const BASE_URL = CMS_URL;

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Set a timeout of 10 seconds
});

// Axios request interceptor to add auth token
axiosInstance.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${CMS_TOKEN}`,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// GET request function
export const getApi = async (endpoint: string, data: any) => {
  try {
    const response = await axiosInstance.get(endpoint, { params: data });
    return response.data;
  } catch (error) {
    throw error; // Propagate error to be handled by TanStack Query
  }
};

// POST request function
export const postApi = async (endpoint: string, data: any) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};