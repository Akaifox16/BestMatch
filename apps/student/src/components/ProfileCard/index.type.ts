export type MatchVariant =
  | 'matePref'
  | 'roomPref'
  | Extract<ProfileVariant, 'profile'>;
export type ProfileVariant = 'profile' | 'summary';

export type StudentVariant = Extract<MatchVariant, 'profile' | 'matePref'>;

export type MatchCardProps = {
  variant: MatchVariant;
};

export type ProfileCardProps = {
  variant: ProfileVariant;
};

export type ProfileOwner = 'self' | 'mate';
export type AttrName = {
  messiness: string;
  noise: string;
  time: string;
};
