import { addDorm, addResidents } from "@server/controller/dorm";
import { router } from "@server/trpc";

export const dormRouter = router({
  addDorm,
  addResidents, 
})