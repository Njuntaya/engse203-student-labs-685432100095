import { defineConfig } from 'vite'; // เพิ่มการนำเข้าตัว defineConfig

const repositoryName = "engse203-student-labs-6854321000  9-5";

export default defineConfig({
  base: `/${repositoryName}/labs/week-02/`,
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});