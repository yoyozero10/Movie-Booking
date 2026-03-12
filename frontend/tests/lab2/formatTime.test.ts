import { formatTime } from '../../src/lib/dateUtils';

describe('DATE-03: formatTime', () => {
    describe('Boundary Cases', () => {
        test('UT001: Should format midnight as 12:00 AM', () => {
            const result = formatTime('2024-01-01T00:00:00');
            expect(result).toBe('12:00 AM');
        });

        test('UT002: Should format noon as 12:00 PM', () => {
            const result = formatTime('2024-01-01T12:00:00');
            expect(result).toBe('12:00 PM');
        });

        test('UT005: Should format 23:59 as 11:59 PM', () => {
            const result = formatTime('2024-01-01T23:59:00');
            expect(result).toBe('11:59 PM');
        });
    });

    describe('Normal Cases', () => {
        test('UT003: Should format 14:30 as 02:30 PM', () => {
            const result = formatTime('2024-01-01T14:30:00');
            expect(result).toBe('02:30 PM');
        });

        test('UT004: Should format 09:15 as 09:15 AM', () => {
            const result = formatTime('2024-01-01T09:15:00');
            expect(result).toBe('09:15 AM');
        });

        test('UT006: Should format 06:45 as 06:45 AM', () => {
            const result = formatTime('2024-01-01T06:45:00');
            expect(result).toBe('06:45 AM');
        });

        test('UT007: Should format 18:20 as 06:20 PM', () => {
            const result = formatTime('2024-01-01T18:20:00');
            expect(result).toBe('06:20 PM');
        });

        test('UT008: Should format 01:05 as 01:05 AM', () => {
            const result = formatTime('2024-01-01T01:05:00');
            expect(result).toBe('01:05 AM');
        });
    });
});
