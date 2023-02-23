import { initTRPC } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from 'superjson';

import { prisma } from '@acme/database';

import { UnAutorizedError } from './model/errors';
import { getServerSession, type Session } from '@acme/auth';

type CreateContextOptions = {
  session: Session | null;
};

function createInnerTRPCContext(opts: CreateContextOptions) {
  return {
    session: opts.session,
    prisma,
  };
}

export default async function createTRPCContext(
  opts: CreateNextContextOptions
) {
  const { req, res } = opts;

  const session = await getServerSession({ req, res });

  return createInnerTRPCContext({
    session,
  });
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user)
    throw UnAutorizedError("You don't have permission to make this procedure.");

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
