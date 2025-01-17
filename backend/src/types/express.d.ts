import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            query: {
                influencerName?: string;
                isRandom?: string;
                timeRange?: string;
                claimsToAnalyze?: string;
                includeProducts?: string;
                includeRevenue?: string;
                verifyWithJournals?: string;
                researchFocus?: string;
            };
        }
    }
}
