-- CreateTable
CREATE TABLE "Hospital" (
    "id" SERIAL NOT NULL,
    "H_No" TEXT NOT NULL,
    "Hospital_Name" TEXT NOT NULL,
    "Place" TEXT NOT NULL,
    "Total_Doctors" INTEGER NOT NULL,
    "Total_Beds" INTEGER NOT NULL,
    "MortailityRate" DOUBLE PRECISION NOT NULL,
    "Cleanliness_Score" DOUBLE PRECISION NOT NULL,
    "Specialties_Present" TEXT NOT NULL,
    "Total_Specialties_Present" INTEGER NOT NULL,
    "Stars" INTEGER NOT NULL,
    "Image" TEXT NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_H_No_key" ON "Hospital"("H_No");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_Hospital_Name_key" ON "Hospital"("Hospital_Name");
