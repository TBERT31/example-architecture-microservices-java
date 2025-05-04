docker pull mongo:7.0.5
docker pull mysql:8.3.0
docker pull confluentinc/cp-zookeeper:7.5.0
docker pull confluentinc/cp-kafka:7.5.0
docker pull confluentinc/cp-schema-registry:7.5.0
docker pull provectuslabs/kafka-ui:latest
docker pull mysql:8
docker pull quay.io/keycloak/keycloak:26.2.0
docker pull grafana/loki:main
docker pull prom/prometheus:v2.46.0
docker pull grafana/tempo:2.2.2
docker pull grafana/grafana:10.1.0
docker pull tbert31/example-archi-ms-api-gateway:latest
docker pull tbert31/example-archi-ms-product-service:latest
docker pull tbert31/example-archi-ms-order-service:latest
docker pull tbert31/example-archi-ms-inventory-service:latest
docker pull tbert31/example-archi-ms-notification-service:latest

kind load docker-image -n microservices mongo:7.0.5
kind load docker-image -n microservices mysql:8.3.0
kind load docker-image -n microservices confluentinc/cp-zookeeper:7.5.0
kind load docker-image -n microservices confluentinc/cp-kafka:7.5.0
kind load docker-image -n microservices confluentinc/cp-schema-registry:7.5.0
kind load docker-image -n microservices provectuslabs/kafka-ui:latest
kind load docker-image -n microservices mysql:8
kind load docker-image -n microservices quay.io/keycloak/keycloak:26.2.0
kind load docker-image -n microservices grafana/loki:main
kind load docker-image -n microservices prom/prometheus:v2.46.0
kind load docker-image -n microservices grafana/tempo:2.2.2
kind load docker-image -n microservices grafana/grafana:10.1.0
kind load docker-image -n microservices tbert31/example-archi-ms-api-gateway:latest
kind load docker-image -n microservices tbert31/example-archi-ms-product-service:latest
kind load docker-image -n microservices tbert31/example-archi-ms-order-service:latest
kind load docker-image -n microservices tbert31/example-archi-ms-inventory-service:latest
kind load docker-image -n microservices tbert31/example-archi-ms-notification-service:latest