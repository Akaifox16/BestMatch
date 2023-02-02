import { createTRPCRouter } from '../trpc';

import { login, register } from '../controller/auth';

export const authRouter = createTRPCRouter({
  login,
  register,
});
