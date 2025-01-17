import { z } from 'zod';


export const GetClaimsInputSchema = z.object({
    username: z.string().min(1, "Username cannot be empty"),
});

export const GetClaimsResponseSchema = z.object({
    claims: z.array(
        z.object({
            text: z.string(),
            category: z.string(),
            confidence: z.number().min(0).max(100),
        })
    ),
    tweetCount: z.number().nonnegative(),
});

export type GetClaimsInput = z.infer<typeof GetClaimsResponseSchema>;
export type GetClaimsResponse = z.infer<typeof GetClaimsResponseSchema>;