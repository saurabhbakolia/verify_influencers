import { z } from 'zod';
import dotenv from 'dotenv'

dotenv.config();

const envSchema = z.object({
    // OpenAI
    OPENAI_API_KEY: z.string(),

    // Twitter
    TWITTER_API_KEY: z.string(),
    TWITTER_API_SECRET: z.string(),
    TWITTER_ACCESS_TOKEN: z.string(),
    TWITTER_ACCESS_SECRET: z.string(),
    TWITTER_API_BEARER_TOKEN: z.string(),

    // Node Environment
    NODE_ENV: z.enum(['development', 'production', 'test']),
});

// Validate the environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('Invalid environment variables:', parsedEnv.error.format());
    process.exit(1); // Exit the app if validation fails
}

export const config = {
    openai: {
        apiKey: parsedEnv.data.OPENAI_API_KEY,
    },
    twitter: {
        apiKey: parsedEnv.data.TWITTER_API_KEY,
        apiSecret: parsedEnv.data.TWITTER_API_SECRET,
        accessToken: parsedEnv.data.TWITTER_ACCESS_TOKEN,
        accessSecret: parsedEnv.data.TWITTER_ACCESS_SECRET,
        bearerToken: parsedEnv.data.TWITTER_API_BEARER_TOKEN,
    },
    nodeEnv: parsedEnv.data.NODE_ENV,
};
