import { createTRPCRouter } from "../../trpc";
import { profileGenerator } from "./match.controller";

const matchRouter = createTRPCRouter({
  // mock up user profile for matching
  generator: profileGenerator,
});

export default matchRouter