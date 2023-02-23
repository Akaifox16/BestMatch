import { createTRPCRouter } from '../trpc';

import { login, register } from '../controller/auth';

const authRouter = createTRPCRouter({
  login: login,
  register: register,
});

export default authRouter;
