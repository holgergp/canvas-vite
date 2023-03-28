/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  test: {
    environment: "jsdom",
    threads: true,
    globals: true,
    setupFiles: "src/testSetup.js",
    alias: [
      { find: /^react-konva$/, replacement: "react-konva/es/ReactKonva.js" },
    ],
  },
})
