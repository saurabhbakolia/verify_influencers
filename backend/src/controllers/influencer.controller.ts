import { Request, Response } from 'express';
import InfluencerService from '../services/influencer.service';
import { FetchHealthClaimsOptions } from '../types/twitter.types';

class InfluencerController {
    /**
     * Endpoint to fetch health-related claims from a specific influencer or random influencers.
     */
    async fetchHealthClaims(req: Request, res: Response) {
        try {
            // Extract the options from request query or body
            const options: FetchHealthClaimsOptions = {
                influencerName: req.query.influencerName?.toString(),
                isRandom: req.query.isRandom === 'true',
                timeRange: req.query.timeRange as FetchHealthClaimsOptions['timeRange'],
                claimsToAnalyze: parseInt(req.query.claimsToAnalyze as string) || 10,
                includeProducts: req.query.includeProducts === 'true',
                includeRevenue: req.query.includeRevenue === 'true',
                verifyWithJournals: req.query.verifyWithJournals === 'true',
                researchFocus: req.query.researchFocus?.toString(),
            };

            // Fetch health claims from the service
            const healthClaims = await InfluencerService.fetchHealthClaims(options);

            // Respond with the fetched health claims
            return res.status(200).json(healthClaims);
        } catch (error) {
            console.error('Error fetching health claims:', error);
            return res.status(500).json({ error: 'Failed to fetch health claims.' });
        }
    }
}

export default new InfluencerController();
