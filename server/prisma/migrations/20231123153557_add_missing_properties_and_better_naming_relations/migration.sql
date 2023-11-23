/*
  Warnings:

  - Added the required column `name` to the `product_unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `product_category` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product_unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    "deletedById" INTEGER,
    CONSTRAINT "product_unit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "product_unit_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "product_unit_id_fkey" FOREIGN KEY ("id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_product_unit" ("createdAt", "createdById", "deletedAt", "deletedById", "description", "id", "isActive", "updatedAt", "updatedById") SELECT "createdAt", "createdById", "deletedAt", "deletedById", "description", "id", "isActive", "updatedAt", "updatedById" FROM "product_unit";
DROP TABLE "product_unit";
ALTER TABLE "new_product_unit" RENAME TO "product_unit";
CREATE TABLE "new_product_category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    "deletedById" INTEGER,
    CONSTRAINT "product_category_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "product_category_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_product_category" ("createdAt", "createdById", "deletedAt", "deletedById", "description", "id", "isActive", "updatedAt", "updatedById") SELECT "createdAt", "createdById", "deletedAt", "deletedById", "description", "id", "isActive", "updatedAt", "updatedById" FROM "product_category";
DROP TABLE "product_category";
ALTER TABLE "new_product_category" RENAME TO "product_category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
