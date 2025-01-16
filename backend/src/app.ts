import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { createContext } from './context';
import { appRouter } from './trpc';

const app = express();
const t = initTRPC.context<inferAsyncReturnType<typeof createContext>>().create();

app.use(express.json());

// Link your appRouter with your defined userRouter
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
