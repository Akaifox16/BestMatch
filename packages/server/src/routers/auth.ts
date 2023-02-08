import { createTRPCRouter } from '@src/trpc';

import { login, register } from '@src/controller/auth';

export const authRouter = createTRPCRouter({
  login: login,
  register: register,
});
