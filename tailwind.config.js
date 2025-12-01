/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Background */
        purple: {
          50: '#EEF0FA',
          100: '#C0C9EE',
          300: '#898AC4',
          500: '#3C3C5E',
          600: '#A7ABC3',
          700: '#23283E',
          800: '#A2AADB',
        },

        /* Foreground - 텍스트, 아이콘 등 */
        'fg-primary': '#081025',
        'fg-purple-100': '#C0C9EE',
        'fg-purple-600': '#A7ABC3',
        'fg-purple-800': '#3C3C5E',
        'fg-cream': '#FFF9F0',
        'fg-error': '#FF3B3B',
        'fg-blue': '#413BFF',
        'fg-gray': '#717272',
        'fg-disabled': '#DBDBDB',
      },

      fontSize: {
        34: '34px',
        28: '28px',
        25: '25px',
        24: '24px',
        20: '20px',
        18: '18px',
        16: '16px',
        15: '15px',
        14: '14px',
        12: '12px',
        11: '11px',
      },

      fontFamily: {
        nsr: ['NanumSquareRoundOTF', 'sans-serif'],
        ng: ['NanumGothic', 'sans-serif'],
        nbp: ['NanumBarunpenOTF', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        pre: ['Pretendard', 'sans-serif'],
        mont: ['Montserrat', 'sans-serif'],
      },

      fontWeight: {
        extrabold: '800',
        bold: '700',
        semibold: '600',
        medium: '500',
        regular: '400',
      },

      borderColor: {
        purple: '#898AC4', // border-purple
      },

      boxShadow: {
        purple: '0 4px 10px rgba(137,138,196,0.8)', // shadow-purple
      },
    },
  },
  plugins: [],
};