import { initTRPC } from '@trpc/server';
import { Context } from './context';
import { userRouter } from './routers/user';

// Initialize tRPC
const t = initTRPC.context<Context>().create();

// Define the app router
export const appRouter = t.router({
    user: userRouter
});

export type AppRouter = typeof appRouter;
