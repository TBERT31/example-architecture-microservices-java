# Spring Boot Microservices
This repository is an example of a microservices architecture using Spring Boot and Next.js. 
The project is designed to demonstrate the use of various technologies and tools in a microservices environment.

You can see the various demos and explanations of the project as it progresses by visiting the branches in question and clicking on the video links below : 
[1-demo-product-service](https://www.youtube.com/)
[2-demo-order-service](https://www.youtube.com/)
[3-demo-inventory-service](https://www.youtube.com/)
[4-communication-synchrone-openfeign](https://www.youtube.com/)
[5-sync-communication-with-openfeign](https://www.youtube.com/)
[6-use-wiremock-to-stub-inventory-service](https://www.youtube.com/)
[7-role-de-api-gateway](https://www.youtube.com/)
[8-api-gateway-component](https://www.youtube.com/)
[9-introduce-keycloak](https://www.youtube.com/)
[10-setup-keycloak-into-project-part-1](https://www.youtube.com/)
[10-setup-keycloak-into-project-part-2](https://www.youtube.com/)
[11-springdoc-api](https://www.youtube.com/)
[12-replace-openfeign-by-springinterfaceclient](https://www.youtube.com/)
[13-introduce-circuit-breaker-pattern](https://www.youtube.com/)
[14-implement-resilience4j-circuit-breaker-part-1](https://www.youtube.com/)
[15-nextjs-frontend](https://www.youtube.com/)
[16-message-queue-and-introduce-kafka](https://www.youtube.com/)
[17-setup-kafka](https://www.youtube.com/)
[18-create-web-notification-service](https://www.youtube.com/)
[19-observability-explications](https://www.youtube.com/)
[19-observability-demo](https://www.youtube.com/)

## Services Overview

- Product Service
- Order Service
- Inventory Service
- Notification Service
- API Gateway using Spring Cloud Gateway MVC
- Shop Frontend using Next.js 15

## Tech Stack

The technologies used in this project are:

- Spring Boot
- Next.js
- Mongo DB
- MySQL
- Kafka
- Keycloak
- Test Containers with Wiremock
- Grafana Stack (Prometheus, Grafana, Loki and Tempo)
- API Gateway using Spring Cloud Gateway MVC
- Kubernetes


## Application Architecture


## How to run the frontend application

Make sure you have the following installed on your machine:

- Node.js
- NPM

Run the following commands to start the frontend application

```shell
cd nextjs-frontend
npm install
npm run dev
```
## How to build the backend services

Run the following command to build and package the backend services into a docker container.
(To get a new <your-docker-account-password>, go generate an Access Token in your Docker Hub account and use it as the password.)

```shell
mvn spring-boot:build-image -Dmaven.test.skip=true -DdockerUsername=<your-docker-account-username> -DdockerPassword=<your-docker-account-password>
```

The above command will build and package the services into a docker container and push it to your docker hub account.

## How to run the backend services

Make sure you have the following installed on your machine:

- Java 21
- Docker
- Kind Cluster - https://kind.sigs.k8s.io/docs/user/quick-start/#installation

### Start Kind Cluster

Run the k8s/kind/create-kind-cluster.sh script to create the kind Kubernetes cluster

```shell
./k8s/kind/create-kind-cluster.sh
```
This will create a kind cluster and pre-load all the required docker images into the cluster, this will save you time downloading the images when you deploy the application.

### Deploy the infrastructure

Run the k8s/manisfests/infrastructure.yaml file to deploy the infrastructure

```shell
kubectl apply -f k8s/manifests/infrastructure.yaml
```

### Deploy the services

Run the k8s/manifests/applications.yaml file to deploy the services

```shell
kubectl apply -f k8s/manifests/applications.yaml
```

### Access the API Gateway

To access the API Gateway, you need to port-forward the gateway service to your local machine

```shell
kubectl port-forward svc/gateway-service 9000:9000
```

### Access the Keycloak Admin Console
To access the Keycloak admin console, you need to port-forward the keycloak service to your local machine

```shell
kubectl port-forward svc/keycloak 8080:8080
```

### Access the Grafana Dashboards
To access the Grafana dashboards, you need to port-forward the grafana service to your local machine

```shell
kubectl port-forward svc/grafana 3000:3000
```