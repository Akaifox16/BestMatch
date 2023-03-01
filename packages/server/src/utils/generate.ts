import { prisma } from '@acme/database';

import { NotFoundError, type ProfileAttributes } from './type';

type GenerateProfile = {
  messiness: number;
  loudness: number;
  do_not_disturb: Array<string>;
};
// TODO: BM-10 | test profileGenerator
export function generate(
  id: string,
  attr: 'messiness' | 'loudness',
  value: number
): Promise<GenerateProfile>;
export function generate(
  id: string,
  attr: 'do_not_disturb',
  value: Array<string>
): Promise<GenerateProfile>;

export async function generate(
  id: string,
  attr: ProfileAttributes,
  value: number | Array<string>
): Promise<GenerateProfile> {
  const profile = await prisma.profile.findFirst({
    where: {
      pref_owner_id: id,
    },
    select: {
      messiness: true,
      loudness: true,
      do_not_disturb: {
        select: {
          start: true,
          stop: true,
        },
      },
    },
  });

  if (profile === null)
    throw NotFoundError('sorry, missing information to generation profile');

  // TODO: change output type
  function newProfile(
    oldProfile: NonNullable<typeof profile>
  ): GenerateProfile {
    const dnd = oldProfile.do_not_disturb.map((t) => `${t.start}`);
    if (attr === 'messiness' && typeof value === 'number')
      return {
        ...oldProfile,
        messiness: value,
        do_not_disturb: dnd,
      };
    else if (attr === 'loudness' && typeof value === 'number')
      return {
        ...oldProfile,
        loudness: value,
        do_not_disturb: dnd,
      };
    else if (attr === 'do_not_disturb' && value instanceof Array<string>)
      return { ...oldProfile, do_not_disturb: value };

    throw new Error('FROM newProfile: invalid input');
  }

  const generateProfile = newProfile(profile);

  return generateProfile;
}
