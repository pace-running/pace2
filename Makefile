dev: docker apply-dev restart-dev wait-dev
prod: dev apply-prod restart-prod wait-prod

docker: docker-image docker-tag docker-push
docker-image:
	docker build . -t pace2
	docker build -f worker/Dockerfile worker -t pace2-worker

docker-tag:
	docker tag pace2:latest localhost:32000/pace2:latest
	docker tag pace2-worker:latest localhost:32000/pace2-worker:latest

docker-push:
	docker push localhost:32000/pace2:latest
	docker push localhost:32000/pace2-worker:latest

apply-dev:
	kubectl apply -k k8s/dev
restart-dev:
	kubectl -n dev-pace rollout restart deployment dev-pace
	kubectl -n dev-pace rollout restart deployment dev-worker
wait-dev:
	kubectl -n dev-pace rollout status deployment  dev-worker --timeout=90s
	kubectl -n dev-pace rollout status deployment  dev-pace --timeout=90s


apply-prod:
	kubectl apply -k k8s/prod
restart-prod:
	kubectl -n prod-pace rollout restart deployment prod-pace
	kubectl -n prod-pace rollout restart deployment prod-worker
wait-prod:
	kubectl -n prod-pace rollout status deployment  prod-worker --timeout=90s
	kubectl -n prod-pace rollout status deployment  prod-pace --timeout=90s
