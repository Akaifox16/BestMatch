import type { ProfileAttributes } from '../../../utils/type';

// CONSTANTS
const SCALE_MIN = 1 as const;
const SCALE_MAX = 9 as const;

const RANGE_LOWER = 0 as const;
const RANGE_UPPER = 23 as const;

// Find New Value Overload
export function findNewValue(
  variant: 'do_not_disturb',
  val: number,
  picked: boolean,
  mid: number,
  isLowerbound: boolean
): number;
export function findNewValue(
  variant: 'messiness' | 'loudness',
  val: number,
  picked: boolean
): number;

// Find New Value for the attribute
export function findNewValue(
  variant: ProfileAttributes,
  val: number,
  picked: boolean,
  mid?: number,
  isLowerbound?: boolean
): number {
  switch (variant) {
    case 'messiness':
    case 'loudness':
      return findNewValueHelper(val, picked, {
        lower: SCALE_MIN,
        upper: SCALE_MAX,
      });
    case 'do_not_disturb':
      if (mid) {
        const range = isLowerbound
          ? { lower: RANGE_LOWER, upper: mid }
          : { lower: RANGE_UPPER, upper: mid };

        return findNewValueHelper(val, picked, range);
      }

    default:
      throw new Error(`received invalid variant ==> ${variant}`);
  }
}

// Helper function
function findNewValueHelper(
  val: number,
  picked: boolean,
  boundary: { lower: number; upper: number }
): number {
  if (picked) {
    return Math.floor((boundary.upper - val) / 2);
  } else {
    return Math.floor((val - boundary.lower) / 2);
  }
}
