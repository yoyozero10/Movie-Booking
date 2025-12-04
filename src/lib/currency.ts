// Currency formatting utilities

export type Currency = 'VND' | 'USD';

export const formatCurrency = (amount: number, currency: Currency = 'VND'): string => {
    if (currency === 'VND') {
        // Format VND: 100,000₫ or 100k₫
        if (amount >= 1000) {
            return `${(amount / 1000).toFixed(0)}k₫`;
        }
        return `${amount.toLocaleString('vi-VN')}₫`;
    } else {
        // Format USD: $12.99
        return `$${amount.toFixed(2)}`;
    }
};

export const formatCurrencyFull = (amount: number, currency: Currency = 'VND'): string => {
    if (currency === 'VND') {
        return `${amount.toLocaleString('vi-VN')}₫`;
    } else {
        return `$${amount.toFixed(2)}`;
    }
};

// Convert between currencies (example rate, should be from API in production)
const VND_TO_USD_RATE = 0.00004; // 1 VND ≈ 0.00004 USD
const USD_TO_VND_RATE = 25000; // 1 USD ≈ 25,000 VND

export const convertCurrency = (amount: number, from: Currency, to: Currency): number => {
    if (from === to) return amount;

    if (from === 'VND' && to === 'USD') {
        return amount * VND_TO_USD_RATE;
    } else {
        return amount * USD_TO_VND_RATE;
    }
};
