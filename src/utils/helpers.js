import { PATTERNS } from '../constants/index.js';

/**
 * Validation Utilities
 */

export const validateEmail = (email) => {
  return PATTERNS.EMAIL.test(email);
};

export const validatePhone = (phone) => {
  return PATTERNS.PHONE.test(phone);
};

export const validateURL = (url) => {
  return PATTERNS.URL.test(url);
};

export const validatePrice = (price, min = 0, max = 100000) => {
  const num = parseFloat(price);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * String Utilities
 */

export const truncateString = (str, length = 100) => {
  if (!str) return '';
  return str.length > length ? `${str.substring(0, length)}...` : str;
};

export const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Array Utilities
 */

export const removeDuplicates = (arr) => {
  return [...new Set(arr)];
};

export const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {});
};

/**
 * Object Utilities
 */

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const filterObject = (obj, predicate) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => predicate(value))
  );
};

/**
 * Date Utilities
 */

export const formatDate = (date, format = 'MM/DD/YYYY') => {
  if (!date) return '';
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();

  return format
    .replace('MM', month)
    .replace('DD', day)
    .replace('YYYY', year);
};

export const isDateInPast = (date) => {
  return new Date(date) < new Date();
};

export const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(months / 12);
  return `${years}y ago`;
};

/**
 * Image Utilities
 */

export const getImageUrl = (path) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `/storage/${path}`;
};

export const isValidImageFormat = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext && ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
};

/**
 * LocalStorage Utilities
 */

export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Debounce Utility
 */

export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle Utility
 */

export const throttle = (func, limit = 300) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export default {
  validateEmail,
  validatePhone,
  validateURL,
  validatePrice,
  truncateString,
  capitalizeFirstLetter,
  formatCurrency,
  removeDuplicates,
  groupBy,
  isEmpty,
  filterObject,
  formatDate,
  isDateInPast,
  getTimeAgo,
  getImageUrl,
  isValidImageFormat,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  debounce,
  throttle,
};
