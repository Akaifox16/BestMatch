import type { Profile, Weights } from '../match.dto';

type DoNotDisturbArray = Pick<Profile, 'do_not_disturb'>['do_not_disturb'];
type DoNotDisturb = NonNullable<ReturnType<DoNotDisturbArray['at']>>;
type PenaltyProfile = Omit<Profile, 'attribute'>;

export default function penaltyCalculator(
  profile: PenaltyProfile,
  preference: PenaltyProfile,
  weights: Weights
) {
  return (
    scalePenalty(
      profile.messiness,
      preference.messiness,
      weights.messiness_weight
    ) +
    scalePenalty(
      profile.loudness,
      preference.loudness,
      weights.loudness_weight
    ) +
    dndPenalty(
      profile.do_not_disturb,
      preference.do_not_disturb,
      weights.do_not_disturb_weight
    )
  );
}

function scalePenalty(
  profile: number,
  preference: number,
  weight: number
): number {
  return weight * Math.abs(preference - profile);
}

function dndPenalty(
  profile: DoNotDisturbArray,
  preference: DoNotDisturbArray,
  weight: number
) {
  const sumPenalty = (acc: number, [prof, pref]: [number, number]) =>
    acc + scalePenalty(prof, pref, weight);

  const zip = (element: DoNotDisturb, idx: number): [number, number] => [
    element.start,
    preference[idx].start,
  ];

  return profile.map(zip).reduce(sumPenalty, 0);
}
