import { validatePassword } from '../../src/lib/validation';

describe('VAL-02: validatePassword', () => {
    describe('Boundary Cases', () => {
        test('UT001: Should validate 6-char password (minimum)', () => {
            const result = validatePassword('pass12');
            expect(result).toBe(true);
        });

        test('UT007: Should reject empty string', () => {
            const result = validatePassword('');
            expect(result).toBe(false);
        });
    });

    describe('Normal Cases', () => {
        test('UT002: Should validate 8-char password', () => {
            const result = validatePassword('password');
            expect(result).toBe(true);
        });

        test('UT003: Should validate 12-char password', () => {
            const result = validatePassword('securePass1');
            expect(result).toBe(true);
        });

        test('UT008: Should validate very long password (20 chars)', () => {
            const result = validatePassword('verylongpassword123');
            expect(result).toBe(true);
        });
    });

    describe('Abnormal Cases', () => {
        test('UT004: Should reject 5-char password (too short)', () => {
            const result = validatePassword('12345');
            expect(result).toBe(false);
        });

        test('UT005: Should reject 3-char password (too short)', () => {
            const result = validatePassword('abc');
            expect(result).toBe(false);
        });

        test('UT006: Should reject 1-char password (too short)', () => {
            const result = validatePassword('a');
            expect(result).toBe(false);
        });
    });
});
