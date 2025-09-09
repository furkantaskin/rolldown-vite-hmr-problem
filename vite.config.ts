import tailwindcss from "@tailwindcss/vite";
import {
	defineConfig,
	type ResolvedConfig,
	type UserConfig,
} from "rolldown-vite";

export default defineConfig(async ({ mode }): Promise<UserConfig> => {
	const isDev = mode === "development";
	const inputFiles: ResolvedConfig["build"]["rolldownOptions"]["input"] = {
		// CSS
		// Genel
		main: "src/main.ts",
		app: "src/style.css",
	};
	return {
		server: {
			cors: true,
		},
		build: {
			modulePreload: false,
			minify: !isDev,
			sourcemap: isDev,
			emptyOutDir: true,
			assetsDir: "js/chunks",
			cssMinify: isDev ? false : "lightningcss",
			outDir: "assets/dist",
			chunkSizeWarningLimit: 600,
			rolldownOptions: {
				input: inputFiles,
			},
		},
		css: {
			lightningcss: {
				exclude: 4 | 8,
			},
		},
		plugins: [tailwindcss()],
	};
});
