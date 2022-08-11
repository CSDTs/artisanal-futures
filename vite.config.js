import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",

		strictPort: true,
		port: 3000,
		hmr: {
			clientPort: 3000, // vite@2.5.2 and newer: clientPort
		},

		// hmr: {
		// 	port: 3000,
		// 	clientPort: 3000,
		// },
	},
});
