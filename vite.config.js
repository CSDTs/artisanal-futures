import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	envDir: "./src",
	assetsInclude: "**/*.md",
});
