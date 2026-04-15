// Environment configuration
const DEFAULT_CANCEL_CUTOFF_MINUTES = 120;
const parsedCancelCutoff = Number.parseInt(import.meta.env.VITE_CANCEL_CUTOFF_MINUTES || '', 10);

export const config = {
  // API Base URL - defaults to localhost for development
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',

  // Node environment
  NODE_ENV: import.meta.env.VITE_NODE_ENV || 'development',

  // Development flag
  isDevelopment: import.meta.env.DEV,

  // Production flag
  isProduction: import.meta.env.PROD,

  // Cancellation policy (minutes before showtime)
  CANCEL_CUTOFF_MINUTES: Number.isFinite(parsedCancelCutoff) && parsedCancelCutoff > 0
    ? parsedCancelCutoff
    : DEFAULT_CANCEL_CUTOFF_MINUTES,
};
