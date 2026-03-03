import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	base: '/react-todos/',
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	server: {
		port: 5173,
		strictPort: true,
	},
	build: {
		outDir: 'dist',
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						if (id.includes('framer-motion')) {
							return 'framer-motion';
						}
						if (
							id.includes('@reduxjs/toolkit') ||
							id.includes('react-redux') ||
							id.includes('/redux/')
						) {
							return 'redux';
						}
						if (id.includes('styled-components')) {
							return 'styled-components';
						}
						if (
							id.includes('react-dom') ||
							id.includes('react/') ||
							id.includes('scheduler')
						) {
							return 'react-vendor';
						}
						if (id.includes('react-router')) {
							return 'react-router';
						}
						return 'vendor';
					}
				},
			},
		},
	},
});
