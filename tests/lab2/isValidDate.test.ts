import { isValidDate } from '../../src/lib/dateUtils';

describe('DATE-01: isValidDate', () => {
    describe('Normal Cases', () => {
        test('UT001: Should validate Jan 1, 2024 as valid', () => {
            const result = isValidDate(1, 1, 2024);
            expect(result).toBe(true);
        });

        test('UT002: Should validate Jun 15, 2024 as valid', () => {
            const result = isValidDate(15, 6, 2024);
            expect(result).toBe(true);
        });

        test('UT005: Should validate Apr 30, 2023 as valid (30-day month)', () => {
            const result = isValidDate(30, 4, 2023);
            expect(result).toBe(true);
        });

        test('UT006: Should validate Dec 31, 2024 as valid', () => {
            const result = isValidDate(31, 12, 2024);
            expect(result).toBe(true);
        });
    });

    describe('Boundary Cases', () => {
        test('UT003: Should validate Feb 28, 2024 as valid (leap year)', () => {
            const result = isValidDate(28, 2, 2024);
            expect(result).toBe(true);
        });

        test('UT004: Should validate Feb 29, 2020 as valid (leap year)', () => {
            const result = isValidDate(29, 2, 2020);
            expect(result).toBe(true);
        });
    });

    describe('Abnormal Cases', () => {
        test('UT007: Should reject day 32 as invalid', () => {
            const result = isValidDate(32, 1, 2024);
            expect(result).toBe(false);
        });

        test('UT008: Should reject month 13 as invalid', () => {
            const result = isValidDate(1, 13, 2025);
            expect(result).toBe(false);
        });
    });
});
