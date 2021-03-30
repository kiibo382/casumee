.PHONY: build-docker
build-docker-stg:
	docker-compose build 

.PHONY: run-docker
run-stg:
	docker-compose up -d

.PHONY: cleanup
cleanup-stg:
	docker-compose down
