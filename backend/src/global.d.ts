// src/global.d.ts or wherever your TypeScript config points
declare namespace NodeJS {
    export interface ProcessEnv {
        // OPENAI
        OPENAI_API_KEY: string;

        // TWITTER
        TWITTER_API_BEARER_TOKEN: string;
        TWITTER_API_SECRET_KEY: string;
        TWITTER_ACCESS_TOKEN: string;
        TWITTER_ACCESS_TOKEN_SECRET: string;

        // COMMON
        NODE_ENV: 'development' | 'production' | 'test';
    }
}
