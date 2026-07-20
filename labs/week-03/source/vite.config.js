import { defineConfig } from 'vite';

const repositoryName = "engse203-student-labs-685432100095"; 

export default defineConfig({
  base: `/${repositoryName}/labs/week-03/`,
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});