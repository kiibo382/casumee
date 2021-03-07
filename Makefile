
.PHONY: dev-init
init:
	npm install

.PHONY: prd-init
init:
	npm install --production

.PHONY: build-local
build-local:
	docker-compose build 

.PHONY: run-local-db
run-local-db:
	docker-compose -f docker-compose.local.yml up

.PHONY: run-local-dev-server
run-local-dev-server:
	npm run start-dev

.PHONY: cleanup
cleanup:
	docker-compose down