import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// CyberVault - Configuração do Vite
// Desenvolvido por Matheus Fernandes
export default defineConfig(({ mode }) => ({
  // Configuração específica para GitHub Pages - ajuste no path
  base: mode === 'production' ? '/CyberVault/' : '/',
  
  server: {
    host: "::",
    port: 8080,
  },
  
  // Build otimizado para produção
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // Mudei para esbuild que é mais rápido
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-tabs'],
          supabase: ['@supabase/supabase-js']
        }
      }
    }
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
