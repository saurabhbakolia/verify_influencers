import { router, publicProcedure } from '../trpc';
import InfluencerService from '../services/influencer.service';
import { z } from 'zod';

export const influencerRouter = router({
    getHealthClaims: publicProcedure.input(
        z.object({
            influencerName: z.string().optional(),
            isRandom: z.boolean().optional(),
            timeRange: z.enum(['last_week', 'last_month', 'last_year', 'all_time']),
            claimsToAnalyze: z.number().optional(),
            includeProducts: z.boolean().optional(),
            includeRevenue: z.boolean().optional(),
            verifyWithJournals: z.boolean().optional(),
            researchFocus: z.string().optional(),
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
