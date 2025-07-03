import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <span className="relative w-6 h-6 block">
        <Sun
          className={`w-6 h-6 text-yellow-500 absolute transition-all duration-500 transform ${
            theme === 'light'
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-50 opacity-0'
          }`}
        />
        <Moon
          className={`w-6 h-6 text-blue-400 absolute transition-all duration-500 transform ${
            theme === 'dark'
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-50 opacity-0'
          }`}
        />
      </span>
    </button>
  );
};

export default ThemeToggle; 