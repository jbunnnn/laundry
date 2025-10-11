import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { CheckCircle, Shield, Clock, Smile } from "lucide-react";

export default defineConfig({
  plugins: [react()],
  server: {
    overlay: false // Menonaktifkan error overlay
  }
})