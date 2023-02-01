import { appRouter } from '@server/routers/_app';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from '@server/db';
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext() {
    return {
      session: null,
      prisma,
    };
  },
  onError({ error, type, path, input, ctx, req }) {
    console.error('Error: ', error);

    if (error.code === 'CONFLICT') {
      console.log('conflict');
    }
  },
});
