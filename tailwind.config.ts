import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#4B6587',
        second: '#F0E5CF',
        highlight: '#F7F6F2',
        success: '#33e014',
        error: '#e11a08'
      },
      screens: {
        xs: '480px'
      },
      boxShadow: {
        main: '0 0 15px 5px rgba(75, 101, 135, 0.5)',
        second: '0 0 15px 5px rgba(240, 229, 207, 0.5)'
      }
    }
  },
  plugins: []
} satisfies Config;
