# Kubernetes deployment

## Deploy application to your kubernetes cluster

`kubectl apply -f kubernetes/production.common-config.yaml -f kubernetes/production.db-deployment.yaml -f kubernetes/production.webapp-deployment.yaml`

## Update your application changes to kubernetes with new production deployment

`kubectl -n workout-tracker rollout restart deployment webapp-deployment`
