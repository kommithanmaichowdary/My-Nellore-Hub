/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F0F2F5', // Soft light grey
          lighter: '#FFFFFF', // Pure white for contrast
          dark: '#1A202C', // Deep charcoal
          darkAlt: '#2D3748', // Slightly lighter charcoal
        },
        card: {
          light: '#FFFFFF',
          dark: '#2D3748',
        },
        headerfooter: {
          light: '#FFFFFF',
          dark: '#1A202C',
        },
        border: {
          light: '#E2E8F0',
          dark: '#4A5568',
        },
        text: {
          primaryLight: '#2D3748',
          secondaryLight: '#718096',
          primaryDark: '#E2E8F0',
          secondaryDark: '#A0AEC0',
        },
        accent: {
          light: '#4A90E2', // Vibrant Blue
          dark: '#38B2AC', // Teal
          darkAlt: '#4299E1', // Lighter Blue
        },
        button: {
          light: '#4A90E2',
          dark: '#38B2AC',
        },
        buttontext: {
          light: '#FFFFFF',
          dark: '#FFFFFF',
        },
        glow: {
          dark: '#38B2AC', // Matching dark accent
        },
        primary: {
          light: '#3182CE', // Stronger Blue
          dark: '#63B3ED', // Lighter Blue for contrast in dark mode
        },
        secondary: {
          light: '#F6AD55', // Soft Orange
          dark: '#ECC94B', // Gold/Yellow for contrast
        },
      },
      boxShadow: {
        'glow-dark': '0 0 16px 2px #38B2AC', // Updated to match new dark accent
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
        'spin-slow': 'spin 8s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
