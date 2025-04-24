import react from '@vitejs/plugin-react';
import path from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: [
        {
          '@iconify/react': [['Icon', 'Icon']],
        },
      ],
    }),
  ],

  // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: `@import "@/assets/styles/index.scss";`,
    //   },
    // },
  },
});
