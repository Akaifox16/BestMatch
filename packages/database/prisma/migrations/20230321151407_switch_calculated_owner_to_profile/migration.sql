-- DropForeignKey
ALTER TABLE "CalculatedPreference" DROP CONSTRAINT "CalculatedPreference_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "CalculatedPreference" ADD CONSTRAINT "CalculatedPreference_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
