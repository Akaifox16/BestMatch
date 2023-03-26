import AuthenticationCard from '@component/AuthenticationCard';
import CustomHeader from '@component/CustomHeader';
// import type {
//   GetServerSidePropsContext,
//   InferGetServerSidePropsType,
// } from 'next';
// import { getCsrfToken } from 'next-auth/react';

// export default function RegisterPage({
//   csrfToken,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
export default function RegisterPage() {
  return (
    <div>
      <CustomHeader pageName='register' />

      <main>
        <AuthenticationCard variant='register' />
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
