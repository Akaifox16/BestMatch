import AuthenticationCard from '@component/AuthenticationCard';
import CustomHeader from '@component/CustomHeader';
// import type {
// GetServerSidePropsContext,
// InferGetServerSidePropsType,
// } from 'next';
// import { getCsrfToken } from 'next-auth/react';

// export default function LoginPage({
//   csrfToken,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
export default function LoginPage() {
  return (
    <div>
      <CustomHeader pageName='login' />

      <main>
        <AuthenticationCard variant='login' />
      </main>
    </div>
  );
}

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(ctx),
//     },
//   };
// }
