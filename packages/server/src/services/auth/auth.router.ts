import { createTRPCRouter } from "../../trpc";
import { login, register } from "./auth.controller";

const authRouter = createTRPCRouter({
  login: login,
  register: register,
});

export default authRouter;