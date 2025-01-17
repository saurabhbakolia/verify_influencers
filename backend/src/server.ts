import rootRouter from "./routers/root.router";
import { createHTTPServer } from '@trpc/server/adapters/standalone';

export type AppRouter = typeof rootRouter;
const server = createHTTPServer({
  router: rootRouter
});

server.listen(8080);
console.log("server listening on port 8080");