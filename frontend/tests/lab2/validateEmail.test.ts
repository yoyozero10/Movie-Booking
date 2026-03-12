import { validateEmail } from '../../src/lib/validation';

describe('VAL-01: validateEmail', () => {
    describe('Normal Cases', () => {
        test('UT001: Should validate user@example.com as valid', () => {
            const result = validateEmail('user@example.com');
            expect(result).toBe(true);
        });

        test('UT002: Should validate test.user@domain.co as valid', () => {
            const result = validateEmail('test.user@domain.co');
            expect(result).toBe(true);
        });

        test('UT003: Should validate admin@company.org as valid', () => {
            const result = validateEmail('admin@company.org');
            expect(result).toBe(true);
        });
    });

    describe('Abnormal Cases', () => {
        test('UT004: Should reject email without @ symbol', () => {
            const result = validateEmail('invalid.email');
            expect(result).toBe(false);
        });

        test('UT005: Should reject email without TLD', () => {
            const result = validateEmail('missing@domain');
            expect(result).toBe(false);
        });

        test('UT006: Should reject email without username', () => {
            const result = validateEmail('@nodomain.com');
            expect(result).toBe(false);
        });
    });

    describe('Boundary Cases', () => {
        test('UT007: Should reject empty string', () => {
            const result = validateEmail('');
            expect(result).toBe(false);
        });

        test('UT008: Should reject whitespace-only string', () => {
            const result = validateEmail('   ');
            expect(result).toBe(false);
        });
    });
});
