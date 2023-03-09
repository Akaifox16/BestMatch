import { createTRPCRouter } from '../../trpc';
import {
  findNewAttribute,
  generateProfile,
  pickedProfile,
} from './match.controller';

const matchRouter = createTRPCRouter({
  // mock up user profile for matching
  generator: generateProfile,
  pickedProfile: pickedProfile,
  findNewAttribute: findNewAttribute,
});

export default matchRouter;
