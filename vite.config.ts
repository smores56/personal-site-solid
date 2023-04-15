import solid from "solid-start/vite";
import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [solid()],
  server: {
    host: process.env.HOST,
    port: 5555
  }
});
