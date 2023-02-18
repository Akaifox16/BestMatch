-- CreateTable
CREATE TABLE "CalculatedPreference" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "owner_id" TEXT NOT NULL,
    "messiness_tolerant_min" INTEGER NOT NULL,
    "messiness_tolerant_max" INTEGER NOT NULL,
    "loudness_tolerant_min" INTEGER NOT NULL,
    "loudness_tolerant_max" INTEGER NOT NULL,

    CONSTRAINT "CalculatedPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoNotDisturbTolerant" (
    "id" TEXT NOT NULL,
    "start_min" INTEGER NOT NULL,
    "start_max" INTEGER NOT NULL,
    "stop_min" INTEGER NOT NULL,
    "stop_max" INTEGER NOT NULL,
    "preferenceId" TEXT NOT NULL,

    CONSTRAINT "DoNotDisturbTolerant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CalculatedPreference_owner_id_key" ON "CalculatedPreference"("owner_id");

-- AddForeignKey
ALTER TABLE "CalculatedPreference" ADD CONSTRAINT "CalculatedPreference_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoNotDisturbTolerant" ADD CONSTRAINT "DoNotDisturbTolerant_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "CalculatedPreference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
