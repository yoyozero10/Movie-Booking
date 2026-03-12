import { sanitizeInput } from '../../src/lib/validation';

describe('VAL-03: sanitizeInput', () => {
    describe('Normal Cases', () => {
        test('UT001: Should not modify plain text', () => {
            const result = sanitizeInput('Hello World');
            expect(result).toBe('Hello World');
        });

        test('UT002: Should escape HTML tag', () => {
            const result = sanitizeInput('<div>');
            expect(result).toBe('&lt;div&gt;');
        });

        test('UT004: Should escape ampersand', () => {
            const result = sanitizeInput('Test & Demo');
            expect(result).toBe('Test &amp; Demo');
        });

        test('UT005: Should escape quotes', () => {
            const result = sanitizeInput('"quoted"');
            expect(result).toBe('&quot;quoted&quot;');
        });

        test('UT006: Should escape ampersand in text', () => {
            const result = sanitizeInput('A & B');
            expect(result).toBe('A &amp; B');
        });

        test('UT008: Should escape complex HTML', () => {
            const result = sanitizeInput('<a href="url">link</a>');
            expect(result).toBe('&lt;a href=&quot;url&quot;&gt;link&lt;&#x2F;a&gt;');
        });
    });

    describe('Abnormal Cases', () => {
        test('UT003: Should prevent XSS script injection', () => {
            const result = sanitizeInput("<script>alert('XSS')</script>");
            expect(result).toBe('&lt;script&gt;alert(&#x27;XSS&#x27;)&lt;&#x2F;script&gt;');
        });
    });

    describe('Boundary Cases', () => {
        test('UT007: Should return empty string for empty input', () => {
            const result = sanitizeInput('');
            expect(result).toBe('');
        });
    });
});
