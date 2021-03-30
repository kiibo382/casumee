
.PHONY: dev-init
dev-init:
	npm install

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
