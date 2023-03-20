import { createTRPCRouter } from '../../trpc';
import {
  getProfile,
  getPreferenceController,
  upsertProfileController,
  upsertPreferenceController,
  upsertDormPreferenceController,
  // getPreference,
} from './student.controller';

const studentRouter = createTRPCRouter({
  // User
  getProfile: getProfile,
  getPreference: getPreferenceController,
  // getRole: getRole,

  upsertProfile: upsertProfileController,
  upsertPreference: upsertPreferenceController,
  upsertDormPreference: upsertDormPreferenceController,
  // Room & Dorm
  // addDormPreference: addDormPreference,
  // editDormPreference: editDormPreference,
  // Book room
  // bookRoom: bookRoom,
});

export default studentRouter;
