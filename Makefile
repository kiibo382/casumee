.PHONY: build
build:
	docker-compose build 

.PHONY: run
run:
	docker-compose up -d

.PHONY: cleanup
cleanup:
	docker-compose down --volumes --remove-orphans
