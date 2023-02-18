import AuthenticationCard from '@component/AuthenticationCard';
import CustomHeader from '@component/CustomHeader';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';

export default function RegisterPage({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <CustomHeader pageName='register' />

      <main>
        <AuthenticationCard variant='ลงทะเบียน' csrfToken={csrfToken} />
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(ctx),
    },
  };
}
