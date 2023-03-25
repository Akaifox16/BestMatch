import { InternalServerError, NotFoundError } from '../../../utils/type';
import { getPreference } from '../../student/utils';
import type { Attribute, ProfileForm } from '../match.dto';

export default async function mockProfileHelper(
  userId: string,
  value: number,
  attr: Attribute
): Promise<ProfileForm> {
  try {
    const profile = await getPreference(userId);

    if (!profile) throw NotFoundError('missing component');

    const flattenedTimerange = (
      timerange: { start: number; stop: number }[]
    ): string[] => {
      return timerange.reduce((acc, { start, stop }) => {
        for (let i = start; i <= stop; i++) {
          acc.push(i.toString());
        }
        return acc;
      }, [] as string[]);
    };

    switch (attr) {
      case 'messiness':
        return {
          messiness: value,
          loudness: profile.loudness,
          do_not_disturb: flattenedTimerange(profile.do_not_disturb),
        };
      case 'loudness':
        return {
          messiness: profile.loudness,
          loudness: value,
          do_not_disturb: flattenedTimerange(profile.do_not_disturb),
        };
      default:
        return {
          ...profile,
          do_not_disturb: flattenedTimerange(profile.do_not_disturb),
        };
    }
  } catch (err) {
    throw InternalServerError(`${err}`);
  }
}
