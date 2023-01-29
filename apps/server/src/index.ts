import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { appRouter } from './app';
import { createContext } from './conext';
const FRONT_END = path.join(process.cwd(), 'client');
const app = express();
app.use(cors({ credentials: true, origin: '*', }));

app.use('/trpc', createExpressMiddleware({ router: appRouter, createContext }));
app.get("/api/health", (req, res) => res.sendStatus(200));
app.get("*.*", express.static(FRONT_END, { maxAge: "1y" }));
app.all("*", (req, res) => res.status(200).sendFile(`/`, { root: FRONT_END }));
(async () => {
  try {
    app.listen(3000, () => console.log('listening on port 3000'));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();


// Export the Express API
export default app