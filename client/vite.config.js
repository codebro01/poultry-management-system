import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url';

// https://vite.dev/config/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
//   build: {
//     outDir: path.resolve(__dirname, '../server/public/'), // Change output directory
//     emptyOutDir: true, // Allow clearing the folder
// },
})
