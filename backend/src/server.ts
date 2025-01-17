import { inferAsyncReturnType } from "@trpc/server";
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { rootRouter } from './routers/root.router';

const app = express();

const createContext = ({ req, res }: { req: express.Request; res: express.Response }) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: rootRouter,
    createContext
  })
);

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});