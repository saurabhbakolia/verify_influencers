import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const userRouter = t.router({
    getUser: t.procedure.input(z.string()).query((opts) => {
        // Imagine using Prisma here to get a user from the database
        return { id: opts.input, name: 'John Doe' };
    }),
});
