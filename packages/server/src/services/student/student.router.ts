import { createTRPCRouter } from '../../trpc';
import {
  getProfile,
  getPreferenceController,
  upsertProfileController,
  upsertPreferenceController,
  upsertDormPreferenceController,
  getDormPreferenceController,
  getWeightsController,
} from './student.controller';

const studentRouter = createTRPCRouter({
  // User
  getProfile: getProfile,
  getPreference: getPreferenceController,
  getDormPreference: getDormPreferenceController,
  getWeights: getWeightsController,

  upsertProfile: upsertProfileController,
  upsertPreference: upsertPreferenceController,
  upsertDormPreference: upsertDormPreferenceController,

  // Book room
  // bookRoom: bookRoom,
});

export default studentRouter;
