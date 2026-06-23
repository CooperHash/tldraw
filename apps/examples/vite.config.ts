import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	root: path.join(__dirname, 'src'),
	build: {
		outDir: path.join(__dirname, 'dist'),
		emptyOutDir: true,
		assetsInlineLimit: 0,
		target: 'es2022',
		minify: false,
	},
	oxc: {
		target: 'es2022',
	},
	server: {
		port: 5420,
		allowedHosts: true,
	},
	preview: {
		port: 5420,
	},
	clearScreen: false,
})
