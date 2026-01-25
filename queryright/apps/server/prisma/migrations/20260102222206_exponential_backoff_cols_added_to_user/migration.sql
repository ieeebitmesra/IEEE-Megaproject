-- AlterTable
ALTER TABLE "user" ADD COLUMN     "emailVerificationRetryCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastVerificationEmailSentAt" TIMESTAMP(3);
