import { convertCurrency } from '../../src/lib/currency';

describe('CUR-03: convertCurrency', () => {
    describe('Normal Cases', () => {
        test('UT001: Should convert 25000 VND to 1 USD', () => {
            const result = convertCurrency(25000, 'VND', 'USD');
            expect(result).toBe(1);
        });

        test('UT002: Should convert 100000 VND to 4 USD', () => {
            const result = convertCurrency(100000, 'VND', 'USD');
            expect(result).toBe(4);
        });

        test('UT003: Should convert 1 USD to 25000 VND', () => {
            const result = convertCurrency(1, 'USD', 'VND');
            expect(result).toBe(25000);
        });

        test('UT004: Should convert 100 USD to 2500000 VND', () => {
            const result = convertCurrency(100, 'USD', 'VND');
            expect(result).toBe(2500000);
        });

        test('UT007: Should convert 50 USD to 1250000 VND', () => {
            const result = convertCurrency(50, 'USD', 'VND');
            expect(result).toBe(1250000);
        });
    });

    describe('Boundary Cases', () => {
        test('UT005: Should handle zero amount', () => {
            const result = convertCurrency(0, 'VND', 'USD');
            expect(result).toBe(0);
        });

        test('UT008: Should return same amount when currencies are identical', () => {
            const result = convertCurrency(50000, 'VND', 'VND');
            expect(result).toBe(50000);
        });
    });

    describe('Abnormal Cases', () => {
        test('UT006: Should handle negative amount', () => {
            const result = convertCurrency(-25000, 'VND', 'USD');
            expect(result).toBe(-1);
        });
    });
});
