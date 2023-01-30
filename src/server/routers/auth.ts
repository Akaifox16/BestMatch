import { createTRPCRouter } from '@server/trpc';

import { login, register } from '@server/controller/auth';

export const authRouter = createTRPCRouter({
  login,
  register,
});
