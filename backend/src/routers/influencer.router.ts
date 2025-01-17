import { router, publicProcedure } from '../trpc';
import InfluencerService from '../services/influencer.service';
import { z } from 'zod';

export const influencerRouter = router({
    getHealthClaims: publicProcedure.input(
        z.object({
            influencerName: z.string(),
            isRandom: z.boolean(),
            timeRange: z.enum(['last_week', 'last_month', 'last_year', 'all_time']),
            claimsToAnalyze: z.number(),
            includeProducts: z.boolean(),
            includeRevenue: z.boolean(),
            verifyWithJournals: z.boolean(),
            researchFocus: z.string(),
        })
    )
        .mutation(async ({ input }) => {
            const {
                influencerName,
                isRandom = false,
                timeRange = 'all_time',
                claimsToAnalyze = 10,
                includeProducts = false,
                includeRevenue = false,
                verifyWithJournals = false,
                researchFocus,
            } = input;

            try {
                const healthClaims = await InfluencerService.fetchInfluencers({
                    influencerName,
                    isRandom,
                    timeRange,
                    claimsToAnalyze,
                    includeProducts,
                    includeRevenue,
                    verifyWithJournals,
                    researchFocus,
                });

                return {
                    success: true,
                    data: healthClaims,
                };
            } catch (error: any) {
                console.error('Error in getHealthClaims:', error);
                return {
                    success: false,
                    message: 'Failed to fetch health claims.',
                    error: error.message,
                };
            }
        }),
});
