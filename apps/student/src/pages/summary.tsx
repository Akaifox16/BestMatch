import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

import { authOptions } from '@acme/auth';

import AccessDenied from '@component/AccessDenied';
import CustomHeader from '@component/CustomHeader';
import ProfileCard from '@component/ProfileCard';

export default function SummaryPage() {
  const {data: session} = useSession()
  
  if (!session){
    return <AccessDenied />
  }

  return (
    <div>
      <CustomHeader pageName='summary' />

      <main>
        <ProfileCard variant='summary' />
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
