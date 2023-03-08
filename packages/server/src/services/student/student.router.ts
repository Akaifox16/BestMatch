import { createTRPCRouter } from '../../trpc';
import {
  getProfile,
  getRole,
  upsertProfile,
  upsertPreference,
  upsertDormPreference,
  getPreference,
} from './student.controller';


const studentRouter = createTRPCRouter({
  // User
  getProfile: getProfile,
  getPreference: getPreference,
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
