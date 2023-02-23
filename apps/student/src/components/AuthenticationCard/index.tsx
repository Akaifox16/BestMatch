import { Typography } from '@mui/material';
import type { getCsrfToken } from 'next-auth/react';

import { titleCase } from 'utils/util';
import AuthCard from './AuthCard';
import { LoginForm } from './variant/Login';
import { RegisterForm } from './variant/Register';

type AuthCardVariant = 'login' | 'register';
export type AuthenicationCardProps = {
  variant: AuthCardVariant;
  csrfToken: Awaited<ReturnType<typeof getCsrfToken>>;
};

function VariantSelector({
  variant,
  csrfToken,
}: Pick<AuthenicationCardProps, 'variant' | 'csrfToken'>) {
  switch (variant) {
    case 'login':
      return <LoginForm token={csrfToken} />;
    case 'register':
      return <RegisterForm />;
  }
}

const AuthenticationCard = ({ variant, csrfToken }: AuthenicationCardProps) => {
  return (
    <AuthCard>
      <Typography variant='h3'>{titleCase(variant)}</Typography>
      <VariantSelector variant={variant} csrfToken={csrfToken} />
    </AuthCard>
  );
};

export default AuthenticationCard;
