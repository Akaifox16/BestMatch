import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

import { authOptions } from '@acme/auth';

import AccessDenied from '@component/AccessDenied';
import CustomHeader from '@component/CustomHeader';
import { ProfileCard } from '@component/Card';
import { trpc } from '@utility/trpc';
import { Typography } from '@mui/material';
import { flattenedTimerange } from '@utility/util';

// import type { RouterInputs } from '@utility/trpc';

export default function SummaryPage() {
  const { data: session } = useSession();
  const {
    data: preference,
    isFetching,
    error,
  } = trpc.student.getPreference.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (!session) {
    return <AccessDenied />;
  }

  if (isFetching)
    return <Typography variant='h4'>Loading your summary...</Typography>;
  if (error || !preference)
    return (
      <Typography variant='h4'>
        There&aposs an error occured during getting your summary
      </Typography>
    );

  return (
    <div>
      <CustomHeader pageName='summary' />
      <main>
        <ProfileCard
          variant='summary'
          profile={{
            messiness: preference.messiness,
            loudness: preference.loudness,
            do_not_disturb: flattenedTimerange(preference.do_not_disturb),
          }}
        />
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
