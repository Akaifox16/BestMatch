import { addDorm } from "../../controller/dorm";
import { createTRPCRouter } from "../../trpc";
import { addResidents } from "./dorm.controller";

const dormRouter = createTRPCRouter({
  addDorm: addDorm,
  addResidents: addResidents,
});

export default dormRouter 