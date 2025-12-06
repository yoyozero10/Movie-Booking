import { generateBookingReference } from '../../src/lib/booking';

describe('BOOK-03: generateBookingReference', () => {
    describe('Normal Cases', () => {
        test('UT001: Should generate reference for standard user ID', () => {
            const result = generateBookingReference('user123');
            expect(result).toMatch(/^BK-USER12-\d+$/);
            expect(result.startsWith('BK-USER12-')).toBe(true);
        });

        test('UT002: Should generate reference for short user ID', () => {
            const result = generateBookingReference('abc');
            expect(result).toMatch(/^BK-ABC-\d+$/);
        });

        test('UT003: Should truncate long user ID to 6 chars', () => {
            const result = generateBookingReference('verylongusername');
            expect(result).toMatch(/^BK-VERYLO-\d+$/);
        });

        test('UT005: Should handle mixed case user ID', () => {
            const result = generateBookingReference('USER456');
            expect(result).toMatch(/^BK-USER45-\d+$/);
        });

        test('UT006: Should handle email as user ID', () => {
            const result = generateBookingReference('test@example.com');
            expect(result).toMatch(/^BK-TEST@E-\d+$/);
        });

        test('UT008: Should handle numeric user ID', () => {
            const result = generateBookingReference('12345678901234');
            expect(result).toMatch(/^BK-123456-\d+$/);
        });
    });

    describe('Boundary Cases', () => {
        test('UT004: Should handle single character user ID', () => {
            const result = generateBookingReference('a');
            expect(result).toMatch(/^BK-A-\d+$/);
        });
    });

    describe('Abnormal Cases', () => {
        test('UT007: Should throw error for empty user ID', () => {
            expect(() => generateBookingReference('')).toThrow('User ID is required');
        });
    });
});
