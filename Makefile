dcup:
	docker-compose down && docker-compose up --build -d

dclog:
	docker logs -f blast_backend

dcdown:
	docker-compose down

dcsh:
	docker exec -it blast_backend sh