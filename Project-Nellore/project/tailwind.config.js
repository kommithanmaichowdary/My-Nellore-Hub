/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f4f4f9',
          lighter: '#f9fafb',
          dark: '#121212',
          darkAlt: '#1e1e2f',
        },
        card: {
          light: '#ffffff',
          dark: '#1f2937',
        },
        headerfooter: {
          light: '#ffffff',
          dark: '#1e293b',
        },
        border: {
          light: '#e5e7eb',
          dark: '#374151',
        },
        text: {
          primaryLight: '#1f2937',
          secondaryLight: '#6b7280',
          primaryDark: '#e5e7eb',
          secondaryDark: '#9ca3af',
        },
        accent: {
          light: '#3b82f6',
          dark: '#0ea5e9',
          darkAlt: '#14b8a6',
        },
        button: {
          light: '#2563eb',
          dark: '#14b8a6',
        },
        buttontext: {
          light: '#ffffff',
          dark: '#000000',
        },
        glow: {
          dark: '#4CC9F0',
        },
        primary: {
          light: '#2C3E50',
          dark: '#4CC9F0',
        },
        secondary: {
          light: '#FF9F1C',
          dark: '#FF9F1C',
        },
      },
      boxShadow: {
        'glow-dark': '0 0 16px 2px #14b8a6',
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in-up-delay-1': 'fadeInUp 1s ease-out 0.3s forwards',
        'fade-in-up-delay-2': 'fadeInUp 1s ease-out 0.6s forwards',
        'scroll': 'scroll 2s ease-in-out infinite',
        'firefly': 'firefly 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scroll: {
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(6px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        firefly: {
          '0%, 100%': {
            transform: 'translate(0, 0)',
            opacity: '0',
          },
          '10%, 90%': {
            opacity: '0.3',
          },
          '50%': {
            transform: 'translate(100px, -100px)',
            opacity: '1',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        pulseSoft: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
