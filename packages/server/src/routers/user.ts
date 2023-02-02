import {
  bookRoom,
  upsertPreference,
  upsertProfile,
} from '@src/controller/user';
import {
  addDormPreference,
  editDormPreference,
} from '@src/controller/user/dormPref';
import { getProfile, getRole } from '@src/controller/user/manager';
import { createTRPCRouter } from '@src/trpc';

export const userRouter = createTRPCRouter({
  // User
  getProfile,
  getRole,

  // Profile
  upsertProfile,

  // Mate
  upsertPreference,

  // Room & Dorm
  addDormPreference,
  editDormPreference,

  // Book room
  bookRoom,
});
