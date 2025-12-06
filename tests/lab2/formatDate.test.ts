import { formatDate } from '../../src/lib/dateUtils';

describe('DATE-02: formatDate', () => {
    describe('Normal Cases', () => {
        test('UT001: Should format Jan 1, 2024', () => {
            const result = formatDate('2024-01-01');
            expect(result).toBe('Jan 1, 2024');
        });

        test('UT002: Should format Jun 15, 2024', () => {
            const result = formatDate('2024-06-15');
            expect(result).toBe('Jun 15, 2024');
        });

        test('UT005: Should format Feb 28, 2023', () => {
            const result = formatDate('2023-02-28');
            expect(result).toBe('Feb 28, 2023');
        });

        test('UT006: Should format ISO datetime (ignore time)', () => {
            const result = formatDate('2024-01-01T00:00:00Z');
            expect(result).toBe('Jan 1, 2024');
        });

        test('UT007: Should format datetime with time (extract date)', () => {
            const result = formatDate('2024-07-04T14:30:00');
            expect(result).toBe('Jul 4, 2024');
        });

        test('UT008: Should format Mar 15, 2025', () => {
            const result = formatDate('2025-03-15');
            expect(result).toBe('Mar 15, 2025');
        });
    });

    describe('Boundary Cases', () => {
        test('UT003: Should format Dec 31, 2024 (end of year)', () => {
            const result = formatDate('2024-12-31');
            expect(result).toBe('Dec 31, 2024');
        });

        test('UT004: Should format Feb 29, 2020 (leap year)', () => {
            const result = formatDate('2020-02-29');
            expect(result).toBe('Feb 29, 2020');
        });
    });
});
