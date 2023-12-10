-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `deletedById` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'NOT_DEFINED') NULL DEFAULT 'NOT_DEFINED',
    `phoneNumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `deletedById` INTEGER NULL,
    `deletedAt` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `amount` DOUBLE NOT NULL,
    `expenseCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expense_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `deletedById` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `operation` ENUM('CREDIT', 'DEBIT') NOT NULL DEFAULT 'DEBIT',
    `account` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification` (
    `id` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL DEFAULT '#',
    `source` VARCHAR(191) NOT NULL DEFAULT 'system',
    `dismissable` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procurement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `deletedById` INTEGER NULL,
    `providerId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `invoiceNumber` VARCHAR(191) NULL,
    `invoiceDate` DATETIME(3) NULL,
    `deliveryStatus` ENUM('PENDING', 'DELIVERED') NOT NULL,
    `deliveredAt` DATETIME(3) NULL,
    `paymentStatus` ENUM('PAID', 'UNPAID') NOT NULL,
    `payedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procurement_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `deletedById` INTEGER NULL,
    `productId` INTEGER NOT NULL,
    `procurementId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `deletedById` INTEGER NULL,
    `categoryId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `barcode` VARCHAR(191) NULL,
    `barcodeType` ENUM('EAN_8', 'EAN_13', 'CODABAR', 'CODE_128', 'CODE_39', 'CODE_11', 'UPC_A', 'UPC_C') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `deletedById` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `deletedById` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `productId` INTEGER NOT NULL,
    `unitId` INTEGER NOT NULL,
    `wholesalePrice` DOUBLE NOT NULL,
    `sellingPrice` DOUBLE NOT NULL,
    `stockAlertEnabled` BOOLEAN NULL DEFAULT false,
    `lowQuantity` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `product_unit_productId_unitId_key`(`productId`, `unitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `deletedById` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `deletedById` INTEGER NULL,
    `customerId` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `discountOnTotal` DOUBLE NOT NULL,
    `taxOnTotal` DOUBLE NOT NULL,
    `billAmount` DOUBLE NOT NULL DEFAULT 0,
    `netAmount` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sale_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `deletedById` INTEGER NULL,
    `saleId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `costPrice` DOUBLE NOT NULL,
    `sellingPrice` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL,
    `tax` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_token` (
    `id` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `userId` INTEGER NOT NULL,
    `expiredAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `createdById` INTEGER NOT NULL,
    `updatedById` INTEGER NOT NULL,
    `deletedById` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `createdById` INTEGER NULL,
    `updatedById` INTEGER NULL,
    `deletedById` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `blockReason` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_createdBy_user_fk` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_updatedBy_user_fk` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_deletedBy_user_fk` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_expenseCategoryId_fkey` FOREIGN KEY (`expenseCategoryId`) REFERENCES `expense_type`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_createdBy_user_fk` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_updatedBy_user_fk` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_deletedBy_user_fk` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `expense_type` ADD CONSTRAINT `expenseCategory_createdBy_user_fk` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `expense_type` ADD CONSTRAINT `expenseCategory_updatedBy_user_fk` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `expense_type` ADD CONSTRAINT `expenseCategory_deletedBy_user_fk` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procurement` ADD CONSTRAINT `procurement_createdBy_user_fk` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `procurement` ADD CONSTRAINT `procurement_updatedBy_user_fk` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `procurement` ADD CONSTRAINT `procurement_deletedBy_user_fk` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `procurement` ADD CONSTRAINT `procurement_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `provider`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `procurement_product` ADD CONSTRAINT `procurement_product_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `procurement_product` ADD CONSTRAINT `procurement_product_procurementId_fkey` FOREIGN KEY (`procurementId`) REFERENCES `procurement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procurement_product` ADD CONSTRAINT `procurement_product_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procurement_product` ADD CONSTRAINT `procurement_product_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procurement_product` ADD CONSTRAINT `procurement_product_deletedById_fkey` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_createdBy_user_fk` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_updatedBy_user_fk` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_deletedBy_user_fk` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_createdBy_user_fk` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_updatedBy_user_fk` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_deletedBy_user_fk` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_unit` ADD CONSTRAINT `productUnit_createdBy_user_fk` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_unit` ADD CONSTRAINT `productUnit_updatedBy_user_fk` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_unit` ADD CONSTRAINT `productUnit_deletedBy_user_fk` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_unit` ADD CONSTRAINT `product_unit_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_unit` ADD CONSTRAINT `product_unit_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `provider` ADD CONSTRAINT `provider_createdBy_user_fk` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `provider` ADD CONSTRAINT `provider_updatedBy_user_fk` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `provider` ADD CONSTRAINT `provider_deletedBy_user_fk` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_createdBy_user_fk` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_updatedBy_user_fk` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_deletedBy_user_fk` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sale_product` ADD CONSTRAINT `sale_product_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `sale`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sale_product` ADD CONSTRAINT `sale_product_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sale_product` ADD CONSTRAINT `saleProduct_createdBy_user_fk` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sale_product` ADD CONSTRAINT `saleProduct_updatedBy_user_fk` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sale_product` ADD CONSTRAINT `saleProduct_deletedBy_user_fk` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `refresh_token` ADD CONSTRAINT `refresh_token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unit` ADD CONSTRAINT `unit_createdBy_user_fk` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `unit` ADD CONSTRAINT `unit_updatedBy_user_fk` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `unit` ADD CONSTRAINT `unit_deletedBy_user_fk` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_createdBy_user_fk` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_updatedBy_user_fk` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_deletedBy_user_fk` FOREIGN KEY (`deletedById`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
