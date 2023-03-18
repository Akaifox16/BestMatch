import type {
  CalculatedPreference,
  DoNotDisturbTolerant,
} from '@acme/database';
import type { getPreference } from '../../student/utils';
import type { Attribute } from '../match.dto';

type CalculatedProfile = Pick<
  CalculatedPreference,
  | 'messiness_tolerant_min'
  | 'messiness_tolerant_max'
  | 'loudness_tolerant_min'
  | 'loudness_tolerant_max'
> & {
  do_not_disturb: Pick<
    DoNotDisturbTolerant,
    'stop_min' | 'stop_max' | 'start_min' | 'start_max'
  >;
};
type Preference = NonNullable<Awaited<ReturnType<typeof getPreference>>>;

type Tolerant = {
  min: number;
  max: number;
};

export default function newValue(
  attr: Attribute,
  isMin: boolean,
  calculatedProfile: CalculatedProfile,
  preference: Preference
) {
  switch (attr) {
    case 'messiness':
      return newScale(
        isMin,
        {
          min: calculatedProfile.messiness_tolerant_min,
          max: calculatedProfile.messiness_tolerant_max,
        },
        preference.messiness
      );
    case 'loudness':
      return newScale(
        isMin,
        {
          min: calculatedProfile.loudness_tolerant_min,
          max: calculatedProfile.loudness_tolerant_max,
        },
        preference.loudness
      );
    case 'do_not_disturb':
      return newRange(
        isMin,
        {
          begin: {
            min: calculatedProfile.do_not_disturb.start_min,
            max: calculatedProfile.do_not_disturb.start_max,
          },
          end: {
            min: calculatedProfile.do_not_disturb.stop_min,
            max: calculatedProfile.do_not_disturb.stop_max,
          },
        },
        preference.do_not_disturb[0]
      );
  }
}

function newScale(isMin: boolean, tolerant: Tolerant, pref: number) {
  if (isMin) return findNewRange(pref, tolerant.max);
  else return findNewRange(tolerant.min, pref);
}

function newRange(
  isMin: boolean,
  tolerant: { begin: Tolerant; end: Tolerant },
  pref: { start: number; stop: number }
) {
  const isBegin = Math.random() < 0.5;
  if (isBegin) return newScale(isMin, tolerant.begin, pref.start);
  else return newScale(isMin, tolerant.end, pref.stop);
}

function findNewRange(min: number, max: number) {
  const range = Math.abs(min - max);
  return Math.floor(Math.random() * range) + min;
}
