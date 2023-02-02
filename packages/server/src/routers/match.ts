import { mockProfile, setupDateTimeOfSystem } from '@src/controller/match';
import { createTRPCRouter } from '@src/trpc';

export const matchRouter = createTRPCRouter({
  // setup datetime of matching system
  setupDateTimeOfSystem,
  // mock up user profile for matching
  mockProfile,
});
