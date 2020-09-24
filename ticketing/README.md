# Ticketing system

## Start ingress-nginx

```bash
https://kubernetes.github.io/ingress-nginx/deploy/#docker-for-mac
```

## Kubernetes secrets configuration

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=private-key
```

## Local Development

Local Kubernetes development using [Skaffold](https://skaffold.dev/).

```bash
skaffold dev
```
