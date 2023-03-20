import { prisma } from '@acme/database';
import { InternalServerError } from '../../../utils/type';
import type { AddDormPrefDto } from '../student.dto';

export default async function upsertDormPreference(
  userId: string,
  input: AddDormPrefDto
) {
  const data = {
    residents_limit: Number(input.residents_limit),
    dorm_type: input.dorm_type,
    about_room_preference: {
      create: {
        zone: input.room_pref.zone,
        floor_number: Number(input.room_pref.floor_number),
      },
    },
  };

  const dormPreference = await prisma.dormPreference.upsert({
    where: { owner_id: userId },
    create: {
      ...data,
      owner_id: userId,
    },
    update: data,
  });

  if (!dormPreference)
    throw InternalServerError('cannot create/update your dorm preference');

  return dormPreference;
}
