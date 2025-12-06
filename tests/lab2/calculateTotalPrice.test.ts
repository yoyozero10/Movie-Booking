import { calculateTotalPrice } from '../../src/lib/booking';

describe('BOOK-01: calculateTotalPrice', () => {
    describe('Normal Cases', () => {
        test('UT001: Should calculate 3 seats × 80000', () => {
            const result = calculateTotalPrice(['A1', 'A2', 'A3'], 80000);
            expect(result).toBe(240000);
        });

        test('UT003: Should calculate 5 seats × 80000', () => {
            const result = calculateTotalPrice(['C1', 'C2', 'C3', 'C4', 'C5'], 80000);
            expect(result).toBe(400000);
        });

        test('UT005: Should calculate 2 seats × 100000', () => {
            const result = calculateTotalPrice(['D1', 'D2'], 100000);
            expect(result).toBe(200000);
        });

        test('UT006: Should calculate 10 seats × 50000', () => {
            const result = calculateTotalPrice(['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'], 50000);
            expect(result).toBe(500000);
        });
    });

    describe('Boundary Cases', () => {
        test('UT002: Should calculate 1 seat × 80000', () => {
            const result = calculateTotalPrice(['B1'], 80000);
            expect(result).toBe(80000);
        });

        test('UT004: Should return 0 for empty array', () => {
            const result = calculateTotalPrice([], 80000);
            expect(result).toBe(0);
        });

        test('UT008: Should return 0 for zero price', () => {
            const result = calculateTotalPrice(['F1'], 0);
            expect(result).toBe(0);
        });
    });

    describe('Abnormal Cases', () => {
        test('UT007: Should return 0 for negative price', () => {
            const result = calculateTotalPrice(['F1'], -1000);
            expect(result).toBe(0);
        });
    });
});
