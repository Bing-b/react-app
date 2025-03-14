/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        xht: ['xht'], // 添加自定义字体
        jy: ['jy'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
