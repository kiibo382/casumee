
.PHONY: dev-init
dev-init:
	npm install

.PHONY: prd-init
prd-init:
	npm install --production

.PHONY: build-local
build-local:
	docker-compose -f docker-compose.local.yml build 

.PHONY: run-local-db
run-local-db:
	docker-compose -f docker-compose.local.yml up

.PHONY: run-local-server
run-local-server:
	npm run start-dev

.PHONY: cleanup
cleanup:
	docker-compose down
