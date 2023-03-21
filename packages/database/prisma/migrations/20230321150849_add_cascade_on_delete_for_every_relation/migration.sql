-- DropForeignKey
ALTER TABLE "CalculatedPreference" DROP CONSTRAINT "CalculatedPreference_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomPreference" DROP CONSTRAINT "RoomPreference_dorm_pref_id_fkey";

-- AddForeignKey
ALTER TABLE "CalculatedPreference" ADD CONSTRAINT "CalculatedPreference_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomPreference" ADD CONSTRAINT "RoomPreference_dorm_pref_id_fkey" FOREIGN KEY ("dorm_pref_id") REFERENCES "DormPreference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
