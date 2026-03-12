const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        display: ["Bricolage Grotesque", ...fontFamily.sans],
      },
      colors: {
        // Apple Blue
        'apple-blue': {
          DEFAULT: '#007AFF',
          50: '#E5F2FF',
          100: '#CCE5FF',
          200: '#99CCFF',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#007AFF',
          600: '#0056CC',
          700: '#004099',
          800: '#002B66',
          900: '#001533',
        },
        // Apple Orange (Premium)
        'apple-orange': {
          DEFAULT: '#FF9500',
          50: '#FFF4E5',
          100: '#FFE9CC',
          200: '#FFD399',
          300: '#FFBD66',
          400: '#FFA733',
          500: '#FF9500',
          600: '#FF6B00',
          700: '#CC5500',
          800: '#994000',
          900: '#662B00',
        },
        // Apple Red
        'apple-red': {
          DEFAULT: '#FF2D55',
          50: '#FFE5EC',
          100: '#FFCCD9',
          200: '#FF99B3',
          300: '#FF668D',
          400: '#FF3367',
          500: '#FF2D55',
          600: '#CC0033',
          700: '#990026',
          800: '#66001A',
          900: '#33000D',
        },
      },
      borderRadius: {
        DEFAULT: "8px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '60px',
      },
      backdropSaturate: {
        0: '0',
        50: '.5',
        100: '1',
        150: '1.5',
        180: '1.8',
        200: '2',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-up': 'slideUp 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'blur-in': 'blurIn 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'scale-in': 'scaleIn 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-right': 'slideRight 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-left': 'slideLeft 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'float': 'float 12s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(30px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-40px) translateX(30px)' },
          '66%': { transform: 'translateY(20px) translateX(-25px)' },
        },
      },
      boxShadow: {
        'glass': '0 32px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass-premium': '0 48px 100px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'apple-blue': '0 8px 24px rgba(0, 122, 255, 0.3)',
        'apple-orange': '0 8px 24px rgba(255, 149, 0, 0.3)',
      },
    },
  },
  variants: {
    extend: {},
  },
};
