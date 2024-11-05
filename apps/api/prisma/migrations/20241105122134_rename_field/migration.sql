/*
  Warnings:

  - You are about to drop the column `Slug` on the `projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "projects_Slug_key";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "Slug",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");
