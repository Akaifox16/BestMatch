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

    const toString = (range: { start: number; stop: number }) =>
      `${range.start}`;

    switch (attr) {
      case 'messiness':
        return {
          messiness: value,
          loudness: profile.loudness,
          do_not_disturb: profile.do_not_disturb.map(toString),
        };
      case 'loudness':
        return {
          messiness: profile.loudness,
          loudness: value,
          do_not_disturb: profile.do_not_disturb.map(toString),
        };
      default:
        return {
          ...profile,
          do_not_disturb: profile.do_not_disturb.map(toString),
        };
    }
  } catch (err) {
    throw InternalServerError(`${err}`);
  }
}
