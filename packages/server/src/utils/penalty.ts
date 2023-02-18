import type { CalculatedPreference, Profile } from '@acme/database';

type Weights = Pick<
  CalculatedPreference,
  'messiness_weight' | 'loudness_weight' | 'do_not_disturb_weight'
>;

type Input = {
  profile: Profile;
  preference: Profile;
  weight: Weights;
};

function differentiateWithWeigth(
  weight: number,
  self: number,
  roommate: number
) {
  return weight * Math.abs(self - roommate);
}

export function calculatePenaltyHelper(
  weight: Weights,
  selfPreference: Profile,
  roommateProfile: Profile
): number {
  const { messiness_weight, loudness_weight, do_not_disturb_weight } = weight;

  return (
    differentiateWithWeigth(
      messiness_weight,
      selfPreference.messiness,
      roommateProfile.messiness
    ) +
    differentiateWithWeigth(
      loudness_weight,
      selfPreference.loudness,
      roommateProfile.loudness
    )
  );
}

export function calculatePenalty(self: Input, roommate: Input): number {
  const selfPenalty = calculatePenaltyHelper(
    self.weight,
    self.preference,
    roommate.profile
  );
  const matePenalty = calculatePenaltyHelper(
    roommate.weight,
    roommate.preference,
    self.profile
  );

  const realPenalty = Math.abs(selfPenalty - matePenalty);

  return realPenalty;
}
