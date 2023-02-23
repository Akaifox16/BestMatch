import { useForm } from 'react-hook-form';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

import { authOptions } from '@acme/auth';

import CustomHeader from '@component/CustomHeader';
import ProfileCard from '@component/ProfileCard';
import AccessDenied from '@component/AccessDenied';

import type { RouterInputs } from '@utility/trpc';

export default function ProfilePage() {
  const { data: session } = useSession();
  // TODO: Add getCalculatedProfile procedure call to default value
  const { control } = useForm<RouterInputs['student']['upsertProfile']>();

  if (!session) {
    return <AccessDenied />;
  }

  return (
    <div>
      <CustomHeader pageName='profile' />

      <main>
        <ProfileCard variant='profile' control={control} />
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(ctx.req, ctx.res, authOptions),
    },
  };
}
