import { createTRPCRouter } from '../../trpc';
import {
  getProfile,
  getRole,
  upsertProfile,
  upsertPreference,
  upsertDormPreference,
} from './student.controller';


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
