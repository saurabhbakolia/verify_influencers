import { config } from '../configs/config';
import { HealthClaim } from '../types/health-claim.types';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: config.openai.apiKey,
    dangerouslyAllowBrowser: true,
});

/**
 * Extract health-related claims from a given tweet text using OpenAI API.
 * @param tweetText The text of the tweet to analyze.
 * @returns An array of health claims.
 */
export const extractHealthClaims = async (tweetText: string): Promise<HealthClaim[]> => {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        {
            "role": 'developer',
            "content": [
                {
                    "type": "text",
                    "text": `
                        You are an expert AI that analyzes health-related content from tweets.
                        Extract health-related claims from the given tweet text. 
                        Output the claims as a JSON array of objects with the structure:
                        Do not include any additional text.
                    `

                },
            ],
        },
        {
            "role": 'user',
            "content": `Tweet: "${tweetText}"`,
        },
    ];

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            store: true,
            messages: messages,
            max_tokens: 300,
            temperature: 0.5,
        });

        const content = response.choices[0]?.message?.content?.trim();
        if (!content) {
            console.warn('No content in OpenAI response.');
            return [];
        }

        const claims: HealthClaim[] = JSON.parse(content);
        return claims;
    } catch (error) {
        console.error('Error extracting health claims:', error);
        return [];
    }
};