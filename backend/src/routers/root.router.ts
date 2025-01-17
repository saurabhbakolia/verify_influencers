import { t } from "../trpc";
import { influencerRouter } from "./influencer.router";


export const rootRouter = t.router({
  influencer: influencerRouter
});