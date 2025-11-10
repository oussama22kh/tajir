import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePhone,
  truncateString,
  capitalizeFirstLetter,
  formatCurrency,
  formatDate,
  getTimeAgo,
  debounce,
  throttle,
} from '../../utils/helpers';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should return true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(validateEmail('invalid.email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should return true for valid phone numbers', () => {
      expect(validatePhone('1234567890')).toBe(true);
      expect(validatePhone('12345678901234')).toBe(true);
    });

    it('should return false for invalid phone numbers', () => {
      expect(validatePhone('123')).toBe(false);
      expect(validatePhone('abc')).toBe(false);
      expect(validatePhone('')).toBe(false);
    });
  });
});

describe('String Utilities', () => {
  describe('truncateString', () => {
    it('should truncate strings longer than the limit', () => {
      const longString = 'a'.repeat(150);
      expect(truncateString(longString, 100)).toBe('a'.repeat(100) + '...');
    });

    it('should not truncate strings shorter than the limit', () => {
      const shortString = 'hello world';
      expect(truncateString(shortString, 20)).toBe(shortString);
    });

    it('should handle empty strings', () => {
      expect(truncateString('', 10)).toBe('');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
      expect(capitalizeFirstLetter('HELLO')).toBe('Hello');
    });

    it('should handle empty strings', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
    });
  });

  describe('formatCurrency', () => {
    it('should format numbers as currency', () => {
      const result = formatCurrency(1000, 'USD');
      expect(result).toContain('1,000');
    });

    it('should handle decimal amounts', () => {
      const result = formatCurrency(99.99, 'USD');
      expect(result).toContain('99.99');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date, 'MM/DD/YYYY')).toBe('01/15/2024');
    });

    it('should handle empty dates', () => {
      expect(formatDate('', 'MM/DD/YYYY')).toBe('');
      expect(formatDate(null, 'MM/DD/YYYY')).toBe('');
    });
  });

  describe('getTimeAgo', () => {
    it('should return "just now" for recent dates', () => {
      const recentDate = new Date(Date.now() - 30000); // 30 seconds ago
      expect(getTimeAgo(recentDate)).toBe('just now');
    });

    it('should return minutes ago for dates within an hour', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60000);
      expect(getTimeAgo(fiveMinutesAgo)).toContain('m ago');
    });

    it('should return hours ago for dates within a day', () => {
      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60000);
      expect(getTimeAgo(threeHoursAgo)).toContain('h ago');
    });
  });
});

describe('Function Utilities', () => {
  describe('debounce', () => {
    it('should debounce function calls', async () => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      await new Promise(resolve => setTimeout(resolve, 150));
      expect(callCount).toBe(1);
    });
  });

  describe('throttle', () => {
    it('should throttle function calls', async () => {
      let callCount = 0;
      const throttledFn = throttle(() => {
        callCount++;
      }, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(callCount).toBe(1);
    });
  });
});
