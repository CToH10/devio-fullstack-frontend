import type { Config } from 'tailwindcss';

const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '3P': 'repeat(3,273px)',
        '4P': 'repeat(4, 208px)',
      },
    },
    colors: {
      green: {
        1: '#0C400D',
        2: '#125C13',
        3: '#00A006',
        4: '#E5F5E6',
      },
      red: {
        1: '#D52727',
        2: '#FAE5E5',
        3: '#F96666',
      },
      grey: {
        1: '#121212',
        2: '#5D5D5D',
        3: '#545454',
        4: '#6F6F6F',
        5: '#BCBCBC',
        6: '#F4F4F4',
      },
      whiteFixed: '#FFFFFF',
      yellow: '#FFEB70',
    },
    fontSize: {
      size_1_56: '3.5rem',
      size_2_36: '2.25rem',
      size_3_32: '2rem',
      size_4_28: '1.75rem',
      size_5_24: '1.5rem',
      size_6_20: '1.25rem',
      size_7_16: '1rem',
      size_8_14: '0.875rem',
      btnBig_16: '1rem',
      btnMedium_14: '0.875rem',
      inputPlace_16: '1rem',
      inputLabel_14: '0.875rem',
    },
  },
  plugins: [],
};
export default config;
