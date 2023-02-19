import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

import { authOptions } from '@acme/auth';

import CustomHeader from '@component/CustomHeader';
import MatingApp from '@component/MatingApp';
import AccessDenied from '@component/AccessDenied';

export default function MatchingPage() {
  const {data: session} = useSession()

  if (!session) {
    return <AccessDenied />
  }

  return (
    <div>
      <CustomHeader pageName='matching' />
      <main>
        <MatingApp />
      </main>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(
        ctx.req,
        ctx.res,
        authOptions
      )
    }
  }
}
