// Booking utility functions

/**
 * Calculate total price for selected seats
 * @param seats - Array of seat IDs
 * @param pricePerSeat - Price per seat
 * @returns Total price
 */
export const calculateTotalPrice = (seats: string[], pricePerSeat: number): number => {
    if (!seats || seats.length === 0) {
        return 0;
    }
    if (pricePerSeat < 0) {
        return 0;
    }
    return seats.length * pricePerSeat;
};

/**
 * Validate seat selection against booked seats
 * @param selectedSeats - Array of selected seat IDs
 * @param bookedSeats - Array of already booked seat IDs
 * @returns true if selection is valid (no overlap), false otherwise
 */
export const validateSeatSelection = (
    selectedSeats: string[],
    bookedSeats: string[]
): boolean => {
    if (!selectedSeats || selectedSeats.length === 0) {
        return false;
    }

    // Check if any selected seat is already booked
    const hasOverlap = selectedSeats.some(seat => bookedSeats.includes(seat));
    return !hasOverlap;
};

/**
 * Generate a unique booking reference
 * @param userId - User ID
 * @returns Booking reference string (format: BK-USERID-TIMESTAMP)
 */
export const generateBookingReference = (userId: string): string => {
    if (!userId) {
        throw new Error('User ID is required');
    }

    const timestamp = Date.now();
    const userPrefix = userId.substring(0, 6).toUpperCase();
    return `BK-${userPrefix}-${timestamp}`;
};

/**
 * Validate booking data completeness
 * @param bookingData - Booking data object
 * @returns true if all required fields are present, false otherwise
 */
export const validateBookingData = (bookingData: {
    showtimeId?: string;
    seats?: string[];
    totalPrice?: number;
}): boolean => {
    if (!bookingData) {
        return false;
    }

    return !!(
        bookingData.showtimeId &&
        bookingData.seats &&
        bookingData.seats.length > 0 &&
        bookingData.totalPrice !== undefined &&
        bookingData.totalPrice > 0
    );
};

/**
 * Check seat availability for a showtime
 * @param totalSeats - Total seats in theater
 * @param bookedSeats - Array of booked seat IDs
 * @returns Number of available seats
 */
export const getAvailableSeatsCount = (
    totalSeats: number,
    bookedSeats: string[]
): number => {
    if (totalSeats < 0) {
        return 0;
    }
    const bookedCount = bookedSeats ? bookedSeats.length : 0;
    return Math.max(0, totalSeats - bookedCount);
};
