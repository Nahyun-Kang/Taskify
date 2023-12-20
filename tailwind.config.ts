import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        largeLogo: "url('/logo/nav_logo_large.svg')",
        smallLogo: "url('/logo/nav_lgoo_small.svg')",
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
        purple: '#760DDE',
        orange: '#FFA500',
        blue: '#76A5EA',
        pink: '#E876EA',
      },
      fontFamily: {
        pre: 'Pretendard',
        mon: 'Montserrat',
      },
      screens: {
        sm: '376px',
        md: '745px',
        lg: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
