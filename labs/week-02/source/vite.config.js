import { defineConfig } from 'vite'; // เพิ่มการนำเข้าตัว defineConfig

const repositoryName = "engse203-student-labs-68543210009-5";

export default defineConfig({
  base: `/${repositoryName}/labs/week-02/`,
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});