-- AlterTable
ALTER TABLE "Notification" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "customer" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "expense" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "expense_type" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "order_id" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "order_product" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "procurement" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "product" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "product_category" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "product_unit" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "refresh_token" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "user" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "vendor" ADD COLUMN "isActive" BOOLEAN DEFAULT true;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "discountOnItems" REAL NOT NULL,
    "discountOnTotal" REAL NOT NULL,
    "tax" REAL NOT NULL,
    "taxPercentageString" TEXT,
    "billAmount" REAL NOT NULL DEFAULT 0,
    "netAmount" REAL NOT NULL,
    "amountPaid" REAL NOT NULL,
    "salesType" INTEGER NOT NULL,
    "transactionStatus" INTEGER NOT NULL,
    "comments" TEXT,
    "customerId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION,
    CONSTRAINT "order_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "order_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_order" ("amountPaid", "billAmount", "comments", "createdAt", "createdById", "customerId", "deletedAt", "discountOnItems", "discountOnTotal", "id", "isActive", "netAmount", "salesType", "tax", "taxPercentageString", "transactionStatus", "updatedAt", "updatedById") SELECT "amountPaid", "billAmount", "comments", "createdAt", "createdById", "customerId", "deletedAt", "discountOnItems", "discountOnTotal", "id", "isActive", "netAmount", "salesType", "tax", "taxPercentageString", "transactionStatus", "updatedAt", "updatedById" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
