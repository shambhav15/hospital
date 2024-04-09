-- CreateTable
CREATE TABLE "User" (
    "kindeId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_kindeId_key" ON "User"("kindeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
