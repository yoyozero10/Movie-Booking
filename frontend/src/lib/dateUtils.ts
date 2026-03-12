// Date and time utility functions

/**
 * Format a date string to a readable format
 * @param dateString - ISO date string or any valid date string
 * @returns Formatted date string (e.g., "Jan 1, 2024")
 */
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

/**
 * Format a date string to a readable time format
 * @param dateString - ISO date string or any valid date string
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Check if a showtime is in the future
 * @param showtimeDate - Date object or date string
 * @returns true if showtime is in the future, false otherwise
 */
export const isShowtimeInFuture = (showtimeDate: Date | string): boolean => {
    const showtime = typeof showtimeDate === 'string' ? new Date(showtimeDate) : showtimeDate;
    return showtime.getTime() > new Date().getTime();
};

/**
 * Check if a date is valid
 * @param day - Day of month (1-31)
 * @param month - Month (1-12)
 * @param year - Full year (e.g., 2024)
 * @returns true if date is valid, false otherwise
 */
export const isValidDate = (day: number, month: number, year: number): boolean => {
    // Check month range
    if (month < 1 || month > 12) {
        return false;
    }

    // Check year range (reasonable range)
    if (year < 1900 || year > 2100) {
        return false;
    }

    // Check day range
    if (day < 1 || day > 31) {
        return false;
    }

    // Check specific month day limits
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
        return false;
    }

    return true;
};

/**
 * Get day of week from a date
 * @param date - Date object or date string
 * @returns Day name (e.g., "Monday")
 */
export const getDayOfWeek = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', { weekday: 'long' });
};
