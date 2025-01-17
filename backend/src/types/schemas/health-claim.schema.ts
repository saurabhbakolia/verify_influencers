import { z } from 'zod';

export const HealthClaimSchema = z.object({
    text: z.string(),
    category: z.string(),
    confidence: z.number().min(0).max(100),
    verified: z.boolean(),
    source: z.string().optional(),
});

export type HealthClaim = z.infer<typeof HealthClaimSchema>;

