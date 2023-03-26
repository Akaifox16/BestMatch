import { Typography } from '@mui/material';

import { titleCase } from 'utils/util';
import AuthCard from './AuthCard';
import { LoginForm } from './variant/Login';
import { RegisterForm } from './variant/Register';

type AuthCardVariant = 'login' | 'register';
export type AuthenicationCardProps = {
  variant: AuthCardVariant;
};

function VariantSelector({ variant }: Pick<AuthenicationCardProps, 'variant'>) {
  switch (variant) {
    case 'login':
      return <LoginForm />;
    case 'register':
      return <RegisterForm />;
  }
}

const AuthenticationCard = ({ variant }: AuthenicationCardProps) => {
  return (
    <AuthCard>
      <Typography variant='h3'>{titleCase(variant)}</Typography>
      <VariantSelector variant={variant} />
    </AuthCard>
  );
};

export default AuthenticationCard;
