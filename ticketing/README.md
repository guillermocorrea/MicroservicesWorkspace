# Ticketing system

## Kubernetes secrets configuration

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=private-key
```
