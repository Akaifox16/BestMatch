import type {
  CalculatedPreference,
  DoNotDisturb,
  Profile,
} from '@acme/database';

type Weights = Pick<
  CalculatedPreference,
  'messiness_weight' | 'loudness_weight' | 'do_not_disturb_weight'
>;
type ProfileWithDoNotDisturb = Profile & {
  do_not_disturb: DoNotDisturb;
};

type Input = {
  profile: ProfileWithDoNotDisturb;
  preference: ProfileWithDoNotDisturb;
  weight: Weights;
};

function differentiateWithWeigth(
  weight: number,
  self: number,
  roommate: number
) {
  return weight * Math.abs(self - roommate);
}

// TODO: Test calculatePenaltyHelper functionality
export function calculatePenaltyHelper(
  weight: Weights,
  selfPreference: ProfileWithDoNotDisturb,
  roommateProfile: ProfileWithDoNotDisturb
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
    ) +
    differentiateWithWeigth(
      do_not_disturb_weight,
      selfPreference.do_not_disturb.stop,
      roommateProfile.do_not_disturb.stop
    ) +
    differentiateWithWeigth(
      do_not_disturb_weight,
      selfPreference.do_not_disturb.start,
      roommateProfile.do_not_disturb.start
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
