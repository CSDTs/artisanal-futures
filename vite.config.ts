const { resolve } = require("path");
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	envDir: "./src",
	assetsInclude: "**/*.md",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
		},
	},
	server: {
		watch: {
			usePolling: true,
		},
		host: "0.0.0.0", // needed for the Docker Container port mapping to work
		strictPort: true,
		port: 5173, // you can replace this port with any port
	},
});
