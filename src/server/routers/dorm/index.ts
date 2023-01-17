import { router } from "@server/trpc";
import addDorm from "./addDorm";
import addResidents from "./addResidents";

export const dormRouter = router({
  addDorm,
  addResidents, 
})