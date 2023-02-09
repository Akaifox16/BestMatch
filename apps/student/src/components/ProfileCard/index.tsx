import CardTemplate from '@component/CardTemplate';
import { Fragment } from 'react';
import { type ProfileCardProps, type ProfileVariant } from './index.type';

const VariantSelector = ({ variant }: { variant: ProfileVariant }) => {
  switch (variant) {
    case 'profile':
      return <></>;
    case 'summary':
      return <></>;
  }
};

const ProfileCard = ({ variant }: ProfileCardProps) => {
  return (
    <CardTemplate name={variant} control={<Fragment />}>
      <VariantSelector variant={variant} />
    </CardTemplate>
  );
};

export default ProfileCard;
