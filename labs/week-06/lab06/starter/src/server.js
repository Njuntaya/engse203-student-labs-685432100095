import { createApp } from './app.js';
import { loadSeed } from './services/requestService.js';

const PORT = process.env.PORT ?? 3001; //Create Port for server = 3001 if no port is provided in the environment variables

await loadSeed();
const app = createApp();

app.listen(PORT, () => {
  console.log(`Campus Service API พร้อมที่ http://localhost:${PORT}`);
});
