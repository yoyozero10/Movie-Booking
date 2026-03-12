// Validation utility functions

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns true if email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
    if (!email || !email.trim()) {
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password meets requirements
 * @param password - Password string to validate
 * @returns true if password is valid, false otherwise
 */
export const validatePassword = (password: string): boolean => {
    if (!password) {
        return false;
    }
    // Minimum 6 characters (matching SignInForm.tsx requirement)
    return password.length >= 6;
};

/**
 * Validate phone number format (Vietnamese format)
 * @param phone - Phone number string to validate
 * @returns true if phone is valid, false otherwise
 */
export const validatePhoneNumber = (phone: string): boolean => {
    if (!phone || !phone.trim()) {
        return false;
    }
    // Vietnamese phone: 10 digits starting with 0
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Sanitize user input to prevent XSS attacks
 * @param input - User input string
 * @returns Sanitized string with HTML entities escaped
 */
export const sanitizeInput = (input: string): string => {
    if (!input) {
        return '';
    }

    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
};

/**
 * Validate credit card number format
 * @param cardNumber - Card number string
 * @returns true if card number is valid format (16 digits), false otherwise
 */
export const isValidCardNumber = (cardNumber: string): boolean => {
    if (!cardNumber) {
        return false;
    }
    // Remove spaces and check if 16 digits
    const cleaned = cardNumber.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
};
