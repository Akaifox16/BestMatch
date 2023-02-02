import { addDorm, addResidents } from '../controller/dorm';
import { createTRPCRouter } from '../trpc';

export const dormRouter = createTRPCRouter({
  addDorm,
  addResidents,
});
