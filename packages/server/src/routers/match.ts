import { mockProfile, setupDateTimeOfSystem } from '../controller/match';
import { createTRPCRouter } from '../trpc';

export const matchRouter = createTRPCRouter({
  // setup datetime of matching system
  setupDateTimeOfSystem,
  // mock up user profile for matching
  mockProfile,
});
