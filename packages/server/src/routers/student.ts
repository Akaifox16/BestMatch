import {
  getProfile,
  getRole,
  upsertProfile,
  upsertPreference,
  upsertDormPreference,
} from '../controller/user';

import { createTRPCRouter } from '../trpc';

const studentRouter = createTRPCRouter({
  // User
  getProfile: getProfile,
  getRole: getRole,

  upsertProfile: upsertProfile,
  upsertPreference: upsertPreference,
  upsertDormPreference: upsertDormPreference,
  // Room & Dorm
  // addDormPreference: addDormPreference,
  // editDormPreference: editDormPreference,
  // Book room
  // bookRoom: bookRoom,
});

export default studentRouter;
