import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    return {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      },
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3001', // Your backend server address
            changeOrigin: true,
          }
        }
      }
    };
});
