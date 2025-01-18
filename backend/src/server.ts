import rootRouter from "./routers/root.router";
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import dotenv  from 'dotenv';

dotenv.config();

export type AppRouter = typeof rootRouter;
const server = createHTTPServer({
  router: rootRouter
});

server.listen(8080);
console.log("server listening on port 8080");