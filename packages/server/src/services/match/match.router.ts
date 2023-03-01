import { createTRPCRouter } from '../../trpc';
import { generateProfile, pickedProfile } from './match.controller';

const matchRouter = createTRPCRouter({
  // mock up user profile for matching
  generator: generateProfile,
  pickedProfile: pickedProfile,
});

export default matchRouter;
