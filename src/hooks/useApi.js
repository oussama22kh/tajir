import { useState, useCallback } from 'react';
import apiClient from '../config/axiosConfig.js';

/**
 * Custom hook for making API calls with built-in error handling
 * @param {Function} apiFunction - The async function that makes the API call
 * @returns {Object} { data, error, loading, execute }
 */
export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, error, loading, execute };
};

/**
 * Retry logic for failed requests
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 */
export const retryRequest = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      // Only retry on network errors or 5xx server errors
      if (
        !error.response ||
        (error.response.status >= 500 && error.response.status < 600)
      ) {
        if (i < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
        }
      } else {
        throw error;
      }
    }
  }
  throw lastError;
};

export default apiClient;
