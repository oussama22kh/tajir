/**
 * Application Constants
 * Centralized configuration for magic strings, numbers, and enumerations
 */

// API Related
export const API_TIMEOUT = 10000; // 10 seconds
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000; // 1 second

// Cookie Related
export const COOKIE_EXPIRY_DAYS = 7;
export const TOKEN_COOKIE_NAME = 'token';

// User Roles
export const USER_ROLES = {
  BUYER: 0,
  SELLER: 1,
};

// Cart Status
export const CART_STATUS = {
  PENDING: 0,
  VALIDATED: 1,
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const PAGINATION_SIZE_OPTIONS = [12, 24, 36];

// Pagination Limits
export const MAX_PRICE = 100000;
export const MIN_PRICE = 0;

// Category Display
export const CATEGORIES_PER_PAGE = 6;

// Ad Carousel
export const AD_CAROUSEL_INTERVAL = 2000; // 2 seconds

// Filter Debounce
export const SEARCH_DEBOUNCE_MS = 300;

// Toast Messages Duration
export const TOAST_DURATION = 3000; // 3 seconds

// Responsive Breakpoints (matches Tailwind)
export const BREAKPOINTS = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
};

// Product Related
export const PRODUCT_RATINGS = {
  MIN: 1,
  MAX: 5,
};

// Review Related
export const MAX_REVIEW_LENGTH = 500;
export const MIN_REVIEW_LENGTH = 10;

// Image Related
export const ALLOWED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
export const MAX_IMAGE_SIZE_MB = 5; // 5 MB

// Validation Patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10,}$/,
  URL: /^https?:\/\/.+/,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SESSION_EXPIRED: 'Session expired. Please login again.',
  UNAUTHORIZED: 'You do not have permission to access this resource.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Validation error. Please check your input.',
  GENERIC_ERROR: 'An error occurred. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Logged in successfully',
  LOGOUT: 'Logged out successfully',
  SIGNUP: 'Account created successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  BRAND_CREATED: 'Brand created successfully',
  REVIEW_CREATED: 'Review submitted successfully',
};

export default {
  API_TIMEOUT,
  API_RETRY_ATTEMPTS,
  API_RETRY_DELAY,
  COOKIE_EXPIRY_DAYS,
  TOKEN_COOKIE_NAME,
  USER_ROLES,
  CART_STATUS,
  ORDER_STATUS,
  DEFAULT_PAGE_SIZE,
  PAGINATION_SIZE_OPTIONS,
  MAX_PRICE,
  MIN_PRICE,
  CATEGORIES_PER_PAGE,
  AD_CAROUSEL_INTERVAL,
  SEARCH_DEBOUNCE_MS,
  TOAST_DURATION,
  BREAKPOINTS,
  PRODUCT_RATINGS,
  MAX_REVIEW_LENGTH,
  MIN_REVIEW_LENGTH,
  ALLOWED_IMAGE_FORMATS,
  MAX_IMAGE_SIZE_MB,
  PATTERNS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
