import { unstable_getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from './auth-options';

export async function getServerSession(ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) {
  return await unstable_getServerSession(ctx.req, ctx.res, authOptions);
}
