dev:
	NODE_ENV=development npm run start:debug
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
execute_script:
	node -r tsconfig-paths/register -r ts-node/register ./src/scripts/index.ts
generate_i18n_types:
	node -r tsconfig-paths/register -r ts-node/register ./src/scripts/index.ts generate-i18n-types
