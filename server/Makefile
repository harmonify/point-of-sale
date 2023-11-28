.PHONY: list

# ANSI escape codes for colors
YELLOW=\033[0;33m
BLUE=\033[0;34m
NC=\033[0m

list:
	@echo "\nAvailable targets:"
	@awk -F: '/^[a-zA-Z0-9_-]+:/{print "$(BLUE)=> $(YELLOW)" $$1 "$(NC)" }' $(MAKEFILE_LIST) | grep -v Makefile | sort
dev:
	NODE_ENV=development npm run start:debug
test:
	NODE_ENV=test npm run test
test_e2e:
	NODE_ENV=test npm run test:e2e
build:
	npm run build
prod: build
	NODE_ENV=production npm run start:prod
orm_migrate:
	npx prisma db push
orm_sync:
	npx prisma migrate dev
orm_seed:
	npx prisma seed
generate_orm_types:
	npx prisma generate
generate_i18n_types:
	NODE_ENV=development npm run execute generate-i18n-types
