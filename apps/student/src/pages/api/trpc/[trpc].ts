import { appRouter, createTRPCContext } from '@acme/server';
import { createNextApiHandler } from '@trpc/server/adapters/next';

export default createNextApiHandler({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  router: appRouter,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  createContext: createTRPCContext,
  onError({ error }) {
    console.error('Error: ', error);

    if (error.code === 'CONFLICT') {
      console.log('conflict');
    }
  },
});
