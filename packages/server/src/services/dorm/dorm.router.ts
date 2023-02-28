import { createTRPCRouter } from '../../trpc';
import { addResidents, addDorm } from './dorm.controller';

const dormRouter = createTRPCRouter({
  addDorm: addDorm,
  addResidents: addResidents,
});

export default dormRouter;
