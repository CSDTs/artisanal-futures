import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	plugins: [react()],
	envDir: "./src",
	assetsInclude: "**/*.md",
	server: {
		watch: {
			usePolling: true,
		},
		host: "0.0.0.0", // needed for the Docker Container port mapping to work
		strictPort: true,
		port: 5173, // you can replace this port with any port
	},
});
