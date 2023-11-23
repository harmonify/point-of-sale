-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product_category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "description" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    CONSTRAINT "product_category_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "product_category_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_product_category" ("createdAt", "createdById", "deletedAt", "description", "id", "isActive", "updatedAt", "updatedById") SELECT "createdAt", "createdById", "deletedAt", "description", "id", coalesce("isActive", true) AS "isActive", "updatedAt", "updatedById" FROM "product_category";
DROP TABLE "product_category";
ALTER TABLE "new_product_category" RENAME TO "product_category";
CREATE TABLE "new_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "costPrice" REAL NOT NULL,
    "sellingPrice" REAL NOT NULL,
    "productCategoryId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    "productUnitId" INTEGER,
    CONSTRAINT "product_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "product_category" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION,
    CONSTRAINT "product_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "product_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "product_productUnitId_fkey" FOREIGN KEY ("productUnitId") REFERENCES "product_unit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_product" ("costPrice", "createdAt", "createdById", "deletedAt", "description", "id", "isActive", "name", "productCategoryId", "productUnitId", "sellingPrice", "updatedAt", "updatedById") SELECT "costPrice", "createdAt", "createdById", "deletedAt", "description", "id", coalesce("isActive", true) AS "isActive", "name", "productCategoryId", "productUnitId", "sellingPrice", "updatedAt", "updatedById" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE TABLE "new_customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    CONSTRAINT "customer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "customer_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_customer" ("address", "createdAt", "createdById", "deletedAt", "description", "email", "id", "isActive", "mobile", "name", "updatedAt", "updatedById") SELECT "address", "createdAt", "createdById", "deletedAt", "description", "email", "id", coalesce("isActive", true) AS "isActive", "mobile", "name", "updatedAt", "updatedById" FROM "customer";
DROP TABLE "customer";
ALTER TABLE "new_customer" RENAME TO "customer";
CREATE TABLE "new_product_unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "description" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    CONSTRAINT "product_unit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "product_unit_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_product_unit" ("createdAt", "createdById", "deletedAt", "description", "id", "isActive", "updatedAt", "updatedById") SELECT "createdAt", "createdById", "deletedAt", "description", "id", coalesce("isActive", true) AS "isActive", "updatedAt", "updatedById" FROM "product_unit";
DROP TABLE "product_unit";
ALTER TABLE "new_product_unit" RENAME TO "product_unit";
CREATE TABLE "new_order_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "qty" INTEGER NOT NULL,
    "costPrice" REAL NOT NULL,
    "sellingPrice" REAL NOT NULL,
    "discount" REAL NOT NULL,
    "price" REAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    CONSTRAINT "order_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("id") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "order_product_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "order_product_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_order_product" ("costPrice", "createdAt", "createdById", "deletedAt", "discount", "id", "isActive", "price", "productId", "qty", "sellingPrice", "updatedAt", "updatedById") SELECT "costPrice", "createdAt", "createdById", "deletedAt", "discount", "id", coalesce("isActive", true) AS "isActive", "price", "productId", "qty", "sellingPrice", "updatedAt", "updatedById" FROM "order_product";
DROP TABLE "order_product";
ALTER TABLE "new_order_product" RENAME TO "order_product";
CREATE TABLE "new_refresh_token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiredAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_refresh_token" ("createdAt", "deletedAt", "expiredAt", "id", "isActive", "updatedAt", "userId") SELECT "createdAt", "deletedAt", "expiredAt", "id", coalesce("isActive", true) AS "isActive", "updatedAt", "userId" FROM "refresh_token";
DROP TABLE "refresh_token";
ALTER TABLE "new_refresh_token" RENAME TO "refresh_token";
CREATE TABLE "new_vendor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    CONSTRAINT "vendor_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "vendor_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_vendor" ("address", "createdAt", "createdById", "description", "email", "id", "isActive", "mobile", "name", "updatedAt", "updatedById") SELECT "address", "createdAt", "createdById", "description", "email", "id", coalesce("isActive", true) AS "isActive", "mobile", "name", "updatedAt", "updatedById" FROM "vendor";
DROP TABLE "vendor";
ALTER TABLE "new_vendor" RENAME TO "vendor";
CREATE TABLE "new_Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "userId" INTEGER NOT NULL,
    "identifier" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL DEFAULT '#',
    "source" TEXT NOT NULL DEFAULT 'system',
    "dismissable" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Notification" ("createdAt", "deletedAt", "description", "dismissable", "id", "identifier", "isActive", "source", "title", "updatedAt", "url", "userId") SELECT "createdAt", "deletedAt", "description", "dismissable", "id", "identifier", coalesce("isActive", true) AS "isActive", "source", "title", "updatedAt", "url", "userId" FROM "Notification";
DROP TABLE "Notification";
ALTER TABLE "new_Notification" RENAME TO "Notification";
CREATE TABLE "new_expense_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "description" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    CONSTRAINT "expense_type_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "expense_type_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_expense_type" ("createdAt", "createdById", "deletedAt", "description", "id", "isActive", "updatedAt", "updatedById") SELECT "createdAt", "createdById", "deletedAt", "description", "id", coalesce("isActive", true) AS "isActive", "updatedAt", "updatedById" FROM "expense_type";
DROP TABLE "expense_type";
ALTER TABLE "new_expense_type" RENAME TO "expense_type";
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL
);
INSERT INTO "new_user" ("createdAt", "deletedAt", "email", "id", "isActive", "isBlocked", "name", "password", "phoneNumber", "updatedAt", "username") SELECT "createdAt", "deletedAt", "email", "id", coalesce("isActive", true) AS "isActive", "isBlocked", "name", "password", "phoneNumber", "updatedAt", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE TABLE "new_order_id" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "count" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    CONSTRAINT "order_id_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "order_id_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_order_id" ("count", "createdAt", "createdById", "deletedAt", "id", "isActive", "updatedAt", "updatedById") SELECT "count", "createdAt", "createdById", "deletedAt", "id", coalesce("isActive", true) AS "isActive", "updatedAt", "updatedById" FROM "order_id";
DROP TABLE "order_id";
ALTER TABLE "new_order_id" RENAME TO "order_id";
CREATE TABLE "new_order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
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
INSERT INTO "new_order" ("amountPaid", "billAmount", "comments", "createdAt", "createdById", "customerId", "deletedAt", "discountOnItems", "discountOnTotal", "id", "isActive", "netAmount", "salesType", "tax", "taxPercentageString", "transactionStatus", "updatedAt", "updatedById") SELECT "amountPaid", "billAmount", "comments", "createdAt", "createdById", "customerId", "deletedAt", "discountOnItems", "discountOnTotal", "id", coalesce("isActive", true) AS "isActive", "netAmount", "salesType", "tax", "taxPercentageString", "transactionStatus", "updatedAt", "updatedById" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
CREATE TABLE "new_procurement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "productId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "payedAt" DATETIME,
    "vendorId" INTEGER,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    CONSTRAINT "procurement_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "procurement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "procurement_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "procurement_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_procurement" ("createdAt", "createdById", "deletedAt", "id", "isActive", "payedAt", "price", "productId", "qty", "updatedAt", "updatedById", "vendorId") SELECT "createdAt", "createdById", "deletedAt", "id", coalesce("isActive", true) AS "isActive", "payedAt", "price", "productId", "qty", "updatedAt", "updatedById", "vendorId" FROM "procurement";
DROP TABLE "procurement";
ALTER TABLE "new_procurement" RENAME TO "procurement";
CREATE TABLE "new_expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "spentAt" DATETIME NOT NULL,
    "expenseTypeId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,
    CONSTRAINT "expense_expenseTypeId_fkey" FOREIGN KEY ("expenseTypeId") REFERENCES "expense_type" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION,
    CONSTRAINT "expense_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "expense_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_expense" ("amount", "createdAt", "createdById", "deletedAt", "description", "expenseTypeId", "id", "isActive", "spentAt", "updatedAt", "updatedById") SELECT "amount", "createdAt", "createdById", "deletedAt", "description", "expenseTypeId", "id", coalesce("isActive", true) AS "isActive", "spentAt", "updatedAt", "updatedById" FROM "expense";
DROP TABLE "expense";
ALTER TABLE "new_expense" RENAME TO "expense";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
