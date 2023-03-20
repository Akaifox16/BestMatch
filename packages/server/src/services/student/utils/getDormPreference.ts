import { prisma } from '@acme/database'
import { InternalServerError, NotFoundError } from '../../../utils/type'

export default async function getDormPreference(ownerId: string) {
  try {
    const dormPref = await prisma.dormPreference.findFirst({
      where: { owner_id: ownerId},
      select: {
        residents_limit: true,
        dorm_type: true,
        about_room_preference: {
          select: {
            floor_number: true,
            zone: true,
          }
        }
      }
    })

    if(!dormPref) throw NotFoundError('not found your dorm preference')

    return dormPref
  } catch(err) {
    throw InternalServerError('something wrong when getting dorm preference')
  }
}