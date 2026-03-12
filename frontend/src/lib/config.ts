// Environment configuration
export const config = {
  // API Base URL - defaults to localhost for development
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',

  // Node environment
  NODE_ENV: import.meta.env.VITE_NODE_ENV || 'development',

  // Development flag
  isDevelopment: import.meta.env.DEV,

  // Production flag
  isProduction: import.meta.env.PROD,
};
