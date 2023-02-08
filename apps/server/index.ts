import App from './src/app';
import dotenv from 'dotenv';
dotenv.config();
new App().startServer().catch(err => {
  console.error(err.message);
  process.exit(0)
})