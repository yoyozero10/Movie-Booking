import { validateSeatSelection } from '../../src/lib/booking';

describe('BOOK-02: validateSeatSelection', () => {
    describe('Normal Cases', () => {
        test('UT001: Should validate seats with no overlap', () => {
            const result = validateSeatSelection(['A1', 'A2'], ['A3', 'A4']);
            expect(result).toBe(true);
        });

        test('UT002: Should validate when no seats are booked', () => {
            const result = validateSeatSelection(['B1', 'B2', 'B3'], []);
            expect(result).toBe(true);
        });

        test('UT007: Should validate when some seats booked but no overlap', () => {
            const result = validateSeatSelection(['F1', 'F2', 'F3'], ['F4', 'F5']);
            expect(result).toBe(true);
        });
    });

    describe('Abnormal Cases', () => {
        test('UT003: Should reject exact overlap (1 seat)', () => {
            const result = validateSeatSelection(['C1'], ['C1']);
            expect(result).toBe(false);
        });

        test('UT004: Should reject partial overlap', () => {
            const result = validateSeatSelection(['D1', 'D2'], ['D1', 'D3']);
            expect(result).toBe(false);
        });

        test('UT005: Should reject full overlap', () => {
            const result = validateSeatSelection(['E1', 'E2'], ['E1', 'E2']);
            expect(result).toBe(false);
        });

        test('UT008: Should reject when selected seat is booked', () => {
            const result = validateSeatSelection(['G1'], ['G1', 'G2']);
            expect(result).toBe(false);
        });
    });

    describe('Boundary Cases', () => {
        test('UT006: Should reject empty selected seats', () => {
            const result = validateSeatSelection([], ['F1']);
            expect(result).toBe(false);
        });
    });
});
