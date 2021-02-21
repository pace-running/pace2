dev: docker apply-dev restart-dev wait-dev
prod: dev apply-prod restart-prod wait-prod

docker: docker-image docker-tag docker-push
docker-image:
	docker build . -t pace2

docker-tag:
	docker tag pace2:latest localhost:32000/pace2:latest

docker-push:
	docker push localhost:32000/pace2:latest

apply-dev:
	kubectl apply -k k8s/dev
restart-dev:
	kubectl rollout restart deployment dev-pace
wait-dev:
	kubectl rollout status deployment  dev-pace --timeout=90s


apply-prod:
	kubectl apply -k k8s/prod
restart-prod:
	kubectl rollout restart deployment prod-pace
wait-prod:
	kubectl rollout status deployment  prod-pace --timeout=90s
