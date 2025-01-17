-- DropForeignKey
ALTER TABLE "Url" DROP CONSTRAINT "Url_owner_id_fkey";

-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "owner_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
