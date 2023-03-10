.PHONY: all backend_drop_all backend_build backend_db_init backend_start

all: backend_drop_all backend_build backend_db_init backend_start

backend_drop:
	docker compose -f docker-compose.common.yml -f docker-compose.yml -f docker-compose.db-init.yml down --volumes

backend_build:
	docker build ./backend -t supcon_backend

backend_db_init:
	docker compose -f docker-compose.common.yml -f docker-compose.db-init.yml up --remove-orphans --exit-code-from db_init

backend_start:
	docker compose -f docker-compose.common.yml -f docker-compose.yml up --remove-orphans