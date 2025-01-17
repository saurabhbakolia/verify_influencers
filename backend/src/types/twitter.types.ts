export type TimeRange = 'last_week' | 'last_month' | 'last_year' | 'all_time';

export interface FetchHealthClaimsOptions {
    influencerName?: string; // Specific influencer name (optional)
    isRandom?: boolean; // Whether to fetch random health-related tweets
    timeRange: TimeRange; // Time range to filter tweets
    claimsToAnalyze?: number; // Number of claims to analyze per influencer
    includeProducts?: boolean; // Whether to find products related to influencers
    includeRevenue?: boolean; // Whether to include revenue analysis
    verifyWithJournals?: boolean; // Whether to verify claims with scientific journals
    researchFocus?: string; // Any specific instructions or focus areas for research
};

export interface Tweet {
    id: string;
    text: string;
    created_at: string;
    author_id: string;
};
