import { bookRoom, upsertPreference, upsertProfile } from '../controller/user';
import {
  addDormPreference,
  editDormPreference,
} from '../controller/user/dormPref';
import { getProfile, getRole } from '../controller/user/manager';
import { createTRPCRouter } from '../trpc';

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
