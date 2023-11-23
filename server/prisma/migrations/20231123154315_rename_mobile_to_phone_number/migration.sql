/*
  Warnings:

  - You are about to drop the column `mobile` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `vendor` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `vendor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    "deletedById" INTEGER,
    CONSTRAINT "customer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "customer_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "customer_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_customer" ("address", "createdAt", "createdById", "deletedAt", "deletedById", "description", "email", "id", "isActive", "name", "updatedAt", "updatedById") SELECT "address", "createdAt", "createdById", "deletedAt", "deletedById", "description", "email", "id", "isActive", "name", "updatedAt", "updatedById" FROM "customer";
DROP TABLE "customer";
ALTER TABLE "new_customer" RENAME TO "customer";
CREATE TABLE "new_vendor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    "deletedById" INTEGER,
    CONSTRAINT "vendor_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "vendor_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "vendor_id_fkey" FOREIGN KEY ("id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_vendor" ("address", "createdAt", "createdById", "deletedById", "description", "email", "id", "isActive", "name", "updatedAt", "updatedById") SELECT "address", "createdAt", "createdById", "deletedById", "description", "email", "id", "isActive", "name", "updatedAt", "updatedById" FROM "vendor";
DROP TABLE "vendor";
ALTER TABLE "new_vendor" RENAME TO "vendor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
