// vite.config.ts
import solid from "file:///home/smores/dev/personal-site/node_modules/solid-start/vite/plugin.js";
import { defineConfig } from "file:///home/smores/dev/personal-site/node_modules/vite/dist/node/index.js";
import dotenv from "file:///home/smores/dev/personal-site/node_modules/dotenv/lib/main.js";
dotenv.config();
var vite_config_default = defineConfig({
  plugins: [solid()],
  server: {
    host: process.env.HOST,
    port: 5555
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9zbW9yZXMvZGV2L3BlcnNvbmFsLXNpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3Ntb3Jlcy9kZXYvcGVyc29uYWwtc2l0ZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9zbW9yZXMvZGV2L3BlcnNvbmFsLXNpdGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgc29saWQgZnJvbSBcInNvbGlkLXN0YXJ0L3ZpdGVcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgZG90ZW52IGZyb20gXCJkb3RlbnZcIjtcblxuZG90ZW52LmNvbmZpZygpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbc29saWQoKV0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IHByb2Nlc3MuZW52LkhPU1QsXG4gICAgcG9ydDogNTU1NVxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFEsT0FBTyxXQUFXO0FBQzlSLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sWUFBWTtBQUVuQixPQUFPLE9BQU87QUFFZCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sTUFBTSxRQUFRLElBQUk7QUFBQSxJQUNsQixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
