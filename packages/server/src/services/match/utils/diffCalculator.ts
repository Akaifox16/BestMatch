import type { getPreference } from '../../student/utils';
import type { Profile } from '../match.dto';

type Preference = NonNullable<Awaited<ReturnType<typeof getPreference>>>;
type DoNotDisturb = NonNullable<ReturnType<Preference['do_not_disturb']['at']>>;

export default function diffCalculator(
  selectedProfile: Profile,
  preference: Preference
): number {
  switch (selectedProfile.attribute) {
    case 'messiness':
      return Math.abs(preference.messiness - selectedProfile.messiness);

    case 'loudness':
      return Math.abs(preference.loudness - selectedProfile.loudness);

    case 'do_not_disturb':
      const zip = (
        element: DoNotDisturb,
        idx: number
      ): [DoNotDisturb, DoNotDisturb] => [
        element,
        preference.do_not_disturb[idx],
      ];

      const diff = (first: DoNotDisturb, second: DoNotDisturb) => {
        const startDiff = first.start - second.start;
        const stopDiff = first.stop - second.stop;

        return startDiff + stopDiff;
      };

      return selectedProfile.do_not_disturb
        .map(zip)
        .reduce((acc, iter) => acc + diff(...iter), 0);
  }
}
