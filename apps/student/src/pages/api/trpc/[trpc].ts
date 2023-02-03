import { appRouter, createTRPCContext } from '@acme/server';
import { createNextApiHandler } from '@trpc/server/adapters/next';

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError({ error }) {
    console.error('Error: ', error);

    if (error.code === 'CONFLICT') {
      console.log('conflict');
    }
  },
});
