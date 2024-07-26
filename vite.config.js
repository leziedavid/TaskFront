import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
// Charger les variables d'environnement du fichier .env
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
});
