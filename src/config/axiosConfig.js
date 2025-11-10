import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { getApiUrl } from './api.js';

// Create axios instance
export const apiClient = axios.create({
  baseURL: getApiUrl(''),
  timeout: 10000, // 10 second timeout
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Safely handle all error scenarios with null checks
    if (!error?.response) {
      // Network error
      toast.error('Network error. Please check your connection.');
      console.error('Network error:', error);
    } else if (error.response?.status === 401) {
      // Unauthorized - token might be expired
      toast.error('Session expired. Please login again.');
      Cookies.remove('token');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden
      toast.error('You do not have permission to access this resource.');
    } else if (error.response?.status === 404) {
      // Not found
      toast.error('Resource not found.');
    } else if (error.response?.status === 500) {
      // Server error
      toast.error('Server error. Please try again later.');
    } else if (error.response?.status === 422) {
      // Validation error
      const messages = error.response?.data?.errors;
      if (messages) {
        Object.values(messages).forEach((msg) => {
          toast.error(Array.isArray(msg) ? msg[0] : msg);
        });
      } else {
        toast.error('Validation error. Please check your input.');
      }
    } else {
      // Generic error with safe property access
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'An error occurred. Please try again.';
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
