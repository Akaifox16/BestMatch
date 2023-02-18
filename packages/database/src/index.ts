import { PrismaClient } from '@prisma/client';
import { env } from '@acme/env';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

export type {
  User,
  Profile,
  DoNotDisturb,
  CalculatedPreference,
  DoNotDisturbTolerant,
  DormPreference,
  RoomPreference,
  Dorm,
  Floor,
  Room,
  Zone,
  Sex,
  Role,
  DormType,
  DormTypePrefer,
} from '@prisma/client';

if (env.NODE_ENV === 'production') global.prisma = prisma;
