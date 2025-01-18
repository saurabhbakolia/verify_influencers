import { TwitterApi } from "twitter-api-v2";
import { FetchHealthClaimsOptions } from "../types/twitter.types";
import { extractHealthClaims } from "../utils/health-claims-extractor";
import { HealthClaim } from "../types/health-claim.types";
import { config } from "../configs/config";

export class InfluencerService {
    private twitterClient: TwitterApi;

    constructor() {
        // this.twitterClient = new TwitterApi({
        //     appKey: process.env.TWITTER_API_KEY!,
        //     appSecret: process.env.TWITTER_APP_SECRET!,
        //     accessToken: process.env.TWITTER_ACCESS_TOKEN!,
        //     accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
        // });

        this.twitterClient = new TwitterApi(config.twitter.bearerToken);
    }

    /**
     * @param options FetchHealthClaimsOptions
     */
    async fetchInfluencers(options: FetchHealthClaimsOptions): Promise<HealthClaim[]> {
        try {
            const { influencerName, isRandom, timeRange, claimsToAnalyze, includeProducts, includeRevenue, verifyWithJournals, researchFocus } = options;
            let query = isRandom ? '#health' : `from:${influencerName}`;

            const timeRangeQuery = this.buildTimeRangeQuery(timeRange);
            query += `${timeRangeQuery}`;

            const tweetsResponse = await this.twitterClient.v2.search(query, {
                max_results: claimsToAnalyze || 10,
            }).catch((err) => {
                console.error("Error fetching tweets from Twitter API:", err.message);
                throw new Error("Twitter API request failed.");
            });

            const tweets = tweetsResponse.data;
            if (!tweets || tweets.data.length === 0) {
                console.warn("No tweets found for the given query.");
                return [];
            }

            const processedTweets = this.processTweets(tweets.data, {
                includeProducts,
                includeRevenue,
                verifyWithJournals,
                researchFocus
            });

            return processedTweets;
        } catch (error) {
            console.error('Error fetching health claims:', error);
            throw new Error('Failed to fetch health claims.');
        }
    };

    private buildTimeRangeQuery(timeRange: FetchHealthClaimsOptions['timeRange']): string {
        const currentDate = new Date();
        let startDate;

        switch (timeRange) {
            case 'last_week':
                startDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
                break;
            case 'last_month':
                startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
                break;
            case 'last_year':
                startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
                break;
            case 'all_time':
            default:
                return ''; // No time filter for 'all_time'
        }

        return `since:${startDate.toISOString().split('T')[0]}`;
    };

    /**
     * Process tweets to handle products, revenue, and verification.
     * @param tweets Tweets fetched from Twitter API
     * @param options Additional processing options
     */
    private async processTweets(
        tweets: any[],
        options: {
            includeProducts?: boolean;
            includeRevenue?: boolean;
            verifyWithJournals?: boolean;
            researchFocus?: string;
        }
    ): Promise<HealthClaim[]> {
        const healthClaims: HealthClaim[] = [];

        // Placeholder logic for processing tweets
        // TODO: Write the proper logic to handle the duplicate tweets.
        // 1. Remove duplicates
        const uniqueTweets = Array.from(new Set(tweets.map(tweet => tweet.text))).map(text =>
            tweets.find(tweet => tweet.text === text)
        );

        for (const tweet of uniqueTweets) {
            try {
                const claims = await extractHealthClaims(tweet.text);
                healthClaims.push(
                    ...claims.map((claim) => ({
                        ...claim,
                        influencerId: tweet.author_id, // Assuming author_id is mapped to the influencer
                    }))
                );
            } catch (err) {
                console.error(`Error extracting claims from tweet: "${tweet.text}". Skipping...`, err);
            }
        }

        // 2. Perform additional processing (e.g., verify with journals, analyze products/revenue)
        if (options.verifyWithJournals) {
            console.log('Verifying claims with journals...');
            // TODO: Implement journal verification logic
        }
        if (options.includeProducts) {
            console.log('Finding products related to tweets...');
            // TODO: Implement product analysis logic
        }
        if (options.includeRevenue) {
            console.log('Analyzing revenue...');
            // TODO: Implement revenue analysis logic
        }

        return healthClaims;
    };
};

export default new InfluencerService();