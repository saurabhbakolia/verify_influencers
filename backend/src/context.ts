import { prisma } from './prisma';

export interface Context {
    prisma: typeof prisma;
    // Add any other shared resources like user authentication info here
}

// This function will be used to create the context for each request
export function createContext() {
    return {
        prisma,
        // Add any other shared resources to the context here
    };
}
