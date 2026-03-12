import { formatCurrencyFull } from '../../src/lib/currency';

describe('CUR-02: formatCurrencyFull', () => {
  describe('Normal Cases', () => {
    test('UT001: Should format 500 VND without thousand separator', () => {
      const result = formatCurrencyFull(500, 'VND');
      expect(result).toBe('500₫');
    });

    test('UT004: Should format 80000 VND with thousand separators (no k)', () => {
      const result = formatCurrencyFull(80000, 'VND');
      expect(result).toBe('80.000₫');
    });

    test('UT005: Should format 12.99 USD correctly', () => {
      const result = formatCurrencyFull(12.99, 'USD');
      expect(result).toBe('$12.99');
    });

    test('UT006: Should format 99.99 USD correctly', () => {
      const result = formatCurrencyFull(99.99, 'USD');
      expect(result).toBe('$99.99');
    });
  });

  describe('Boundary Cases', () => {
    test('UT002: Should format 999 VND without thousand separator', () => {
      const result = formatCurrencyFull(999, 'VND');
      expect(result).toBe('999₫');
    });

    test('UT003: Should format 1000 VND with thousand separator (no k)', () => {
      const result = formatCurrencyFull(1000, 'VND');
      expect(result).toBe('1.000₫');
    });

    test('UT008: Should format 0 VND correctly', () => {
      const result = formatCurrencyFull(0, 'VND');
      expect(result).toBe('0₫');
    });
  });

  describe('Abnormal Cases', () => {
    test('UT007: Should handle negative amount with thousand separator', () => {
      const result = formatCurrencyFull(-1000, 'VND');
      expect(result).toBe('-1.000₫');
    });
  });
});
