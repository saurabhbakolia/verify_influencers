import { router } from "../trpc";
import { influencerRouter } from "./influencer.router";

const rootRouter = router({
  influencer: influencerRouter,
});

export default rootRouter;