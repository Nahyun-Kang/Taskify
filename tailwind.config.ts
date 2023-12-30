import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        largeLogo: "url('/logo/nav_logo_large.svg')",
        smallLogo: "url('/logo/nav_logo_small.svg')",
        checkbox: "url('/images/custom-check-icon)",
      },
      colors: {
        black: '#171717',
        black80: '#333236',
        black60: '#4B4B4B',
        gray50: '#787486',
        gray40: '#9FA6B2',
        gray30: '#D9D9D9',
        gray20: '#EEEEEE',
        gray10: '#FAFAFA',
        white: '#FFFFFF',
        violet: '#5534DA',
        violet8: '#F1EFFD',
        red: '#D6173A',
        green: '#7AC555',
        green10: '#E7F7DB',
        green20: '#86D549',
        purple: '#760DDE',
        orange: '#FFA500',
        orange10: '#F9EEE3',
        orange20: '#D58D49',
        blue: '#76A5EA',
        blue10: '#DBE6F7',
        blue20: '#4981D5',
        pink: '#E876EA',
        pink10: '#F7DBF0',
        pink20: '#D549B6',
      },
      fontFamily: {
        pre: 'Pretendard',
        mon: 'Montserrat',
        mp: ['Montserrat', 'Pretendard'],
      },
      screens: {
        sm: '376px',
        md: '745px',
        lg: '1440px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

export default config;
