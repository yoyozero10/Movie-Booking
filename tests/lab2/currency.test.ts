import { formatCurrency } from '../../src/lib/currency';

describe('CUR-01: formatCurrency', () => {
    describe('Normal Cases', () => {
        test('UT001: Should format 500 VND without k abbreviation', () => {
            const result = formatCurrency(500, 'VND');
            expect(result).toBe('500₫');
        });

        test('UT004: Should format 80000 VND with k abbreviation (typical ticket price)', () => {
            const result = formatCurrency(80000, 'VND');
            expect(result).toBe('80k₫');
        });

        test('UT005: Should format 12.99 USD correctly', () => {
            const result = formatCurrency(12.99, 'USD');
            expect(result).toBe('$12.99');
        });

        test('UT006: Should format 99.99 USD correctly', () => {
            const result = formatCurrency(99.99, 'USD');
            expect(result).toBe('$99.99');
        });
    });

    describe('Boundary Cases', () => {
        test('UT002: Should format 999 VND without k (just below 1000)', () => {
            const result = formatCurrency(999, 'VND');
            expect(result).toBe('999₫');
        });

        test('UT003: Should format 1000 VND with k (exactly 1000)', () => {
            const result = formatCurrency(1000, 'VND');
            expect(result).toBe('1k₫');
        });

        test('UT008: Should format 0 VND correctly', () => {
            const result = formatCurrency(0, 'VND');
            expect(result).toBe('0₫');
        });
    });

    describe('Abnormal Cases', () => {
        test('UT007: Should handle negative amount', () => {
            const result = formatCurrency(-1000, 'VND');
            expect(result).toBe('-1k₫');
        });
    });
});
