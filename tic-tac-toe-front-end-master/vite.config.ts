import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    define: {
        // "process.env": process.env,
        // By default, Vite doesn't include shims for NodeJS
        // necessary for segment analytics lib to work
        // global: {},
    },
});
