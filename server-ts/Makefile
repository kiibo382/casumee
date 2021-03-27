
.PHONY: dev-init
dev-init:
	npm install

.PHONY: prd-init
prd-init:
	npm install --production

.PHONY: build-docker-local
build-docker-local:
	docker-compose -f docker-compose.local.yml build 

.PHONY: build-ts
build-ts:
	npm run build 

.PHONY: run-local-db
run-local-db:
	docker-compose -f docker-compose.local.yml up

.PHONY: run-local-server
run-local-server:
	npm run start-dev

.PHONY: cleanup-local
cleanup-local:
	docker-compose -f docker-compose.local.yml down

.PHONY: build-docker-stg
build-docker-stg:
	docker-compose build 

.PHONY: run-stg
run-stg:
	docker-compose up -d && docker exec node npm run start-stg

.PHONY: cleanup-stg
cleanup-stg:
	docker-compose down

.PHONY: build-docker-prd
build-docker-prd:
	docker-compose build 

.PHONY: run-prd
run-prd:
	docker-compose up -d && docker exec node npm run start-prd

.PHONY: cleanup-prd
cleanup-prd:
	docker-compose down
