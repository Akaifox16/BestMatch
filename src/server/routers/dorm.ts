import { addDorm, addResidents } from '@server/controller/dorm';
import { createTRPCRouter } from '@server/trpc';

export const dormRouter = createTRPCRouter({
  addDorm,
  addResidents,
});
