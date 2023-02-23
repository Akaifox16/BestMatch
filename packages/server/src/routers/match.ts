import { generator } from '../controller/match';
import { createTRPCRouter } from '../trpc';

export const matchRouter = createTRPCRouter({
  // mock up user profile for matching
  generator: generator,
});
