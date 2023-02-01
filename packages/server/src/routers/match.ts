import { mockProfile, setupDateTimeOfSystem } from '@server/controller/match';
import { createTRPCRouter } from '@server/trpc';

export const matchRouter = createTRPCRouter({
  // setup datetime of matching system
  setupDateTimeOfSystem,
  // mock up user profile for matching
  mockProfile,
});
