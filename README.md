# Spring Boot Microservices
This repository is an example of a microservices architecture using Spring Boot and Next.js. 
The project is designed to demonstrate the use of various technologies and tools in a microservices environment.

## Screencasts demonstrations & explanations

You can see the various demos and explanations of the project as it progresses by visiting the branches in question and clicking on the video links below : 
- [1-demo-product-service](https://youtu.be/937Yzy4TM2A)
- [2-demo-order-service](https://youtu.be/XJZZUBXHMpU)
- [3-demo-inventory-service](https://youtu.be/bFdfhZ6WFrU)
- [4-communication-synchrone-openfeign](https://youtu.be/uHlnfSPuhUk)
- [5-sync-communication-with-openfeign](https://youtu.be/RzUB20RS0Jk)
- [6-use-wiremock-to-stub-inventory-service](https://youtu.be/lG87-UcnGRI)
- [7-role-de-api-gateway](https://youtu.be/L708xqX_OMM)
- [8-api-gateway-component](https://youtu.be/SroV-Y7azeY)
- [9-introduce-keycloak](https://youtu.be/DXKXWoxSLBs)
- [10-setup-keycloak-into-project-part-1](https://youtu.be/yU8BCroF3bg)
- [10-setup-keycloak-into-project-part-2](https://youtu.be/0L_SGD0mdF8)
- [11-springdoc-api](https://youtu.be/M_aDQ__x7iE)
- [12-replace-openfeign-by-springinterfaceclient](https://youtu.be/Xf1G5CyXbuw)
- [13-introduce-circuit-breaker-pattern](https://youtu.be/IX3e0enCEhY)
- [14-implement-resilience4j-circuit-breaker-part-1](https://youtu.be/AOu33FugxMg)
- [15-nextjs-frontend](https://youtu.be/obQTMMIOW1M)
- [16-message-queue-and-introduce-kafka](https://youtu.be/bbC1IHd1hIQ)
- [17-setup-kafka](https://youtu.be/zdbi-5gnabg)
- [18-create-web-notification-service](https://youtu.be/G2uGKSP1CQE)
- [19-observability-explications](https://youtu.be/YLciIwMq0hE)
- [19-observability-demo](https://youtu.be/TPafklBx_GM)

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
- MySQL
- API Gateway using Spring Cloud Gateway MVC
- Mongo DB
- Kafka
- Keycloak
- Test Containers with Wiremock
- Grafana Stack (Prometheus, Grafana, Loki and Tempo)
- Kubernetes


## Application Architecture

## How to run the backend services

Make sure you have the following installed on your machine:

- Java 21
- Docker

### Start the API Gateway

To start the API Gateway

```shell
cd api-gateway
docker-compose up -d
```

Then, launch the Spring Boot application:
- With IntelliJ IDEA or another IDE:
Open the ApiGatewayApplication.java file (located in src/main/java/com/tbert31/api_gateway/)
Then click on the green ▶️ icon next to the main method or at the top of the file to run the application.

- Or via command line:
```shell
./mvnw spring-boot:run
```

api-gateway is set to run on  : [http://localhost:9000](http://localhost:9000)

### Access the Keycloak Admin Console
To access the Keycloak admin console, you can access it on : [http://localhost:8181](http://localhost:8181)

You can connect to the master realm with admin/admin :
![image](https://github.com/user-attachments/assets/14bfaf88-4898-424d-a77e-f465a29f8820)

If it doesn't already exist, create a new realm named `spring-microservices-security-realm`.  

Go to your new realm and create a new client named `nextjs-frontend`.

In the capability config section, this client must have Client authentication (On).  

Standard flow, Direct access grants, Service accounts roles have to be true.  

Finally, go to the Credential section of client `nextjs-frontend` and copy the client-secret.  

![image](https://github.com/user-attachments/assets/b1dc006d-1ed0-4507-b160-3baa821bb61c)

Copy the value to update the environment variable file (.env.local) of the nextjs-frontend.  

### Start the Product Service

To start the Product-Service

```shell
cd product-service
docker-compose up -d
```

Then, launch the Spring Boot application:
- With IntelliJ IDEA or another IDE:
Open the ProductServiceApplication.java file (located in src/main/java/com/tbert31/microservices/product)
Then click on the green ▶️ icon next to the main method or at the top of the file to run the application.

- Or via command line:
```shell
./mvnw spring-boot:run
```
product-service is set to run on  : [http://localhost:8080](http://localhost:8080)

You can access the contents of the MongoDB database with the tool [MongoDB Compass](https://www.mongodb.com/fr-fr/products/tools/compass)  
from this path: `src/main/resources/application.properties`

Check that the connection to the MongoDB database is correct according to the information in the docker-compose.yml file


### Start the Order Service

To start the Order-Service

```shell
cd order-service
docker-compose up -d
```

Then, launch the Spring Boot application:
- With IntelliJ IDEA or another IDE:
Open the OrderServiceApplication.java file (located in src/main/java/com/tbert31/microservices/order)
Then click on the green ▶️ icon next to the main method or at the top of the file to run the application.

- Or via command line:
```shell
./mvnw spring-boot:run
```

order-service is set to run on  : [http://localhost:8081](http://localhost:8081)

You can access the contents of the MySQL database with the tool [MySQL Workbench](https://www.mysql.com/fr/products/workbench/) 

### Start the Inventory Service

To start the Inventory-Service

```shell
cd inventory-service
docker-compose up -d
```

Then, launch the Spring Boot application:
- With IntelliJ IDEA or another IDE:  
Open the InventoryServiceApplication.java file (located in src/main/java/com/tbert31/microservices/inventory)
Then click on the green ▶️ icon next to the main method or at the top of the file to run the application.

- Or via command line:  
```shell
./mvnw spring-boot:run
```

inventory-service is set to run on  : [http://localhost:8082](http://localhost:8082)

You can access the contents of the MySQL database with the tool [MySQL Workbench](https://www.mysql.com/fr/products/workbench/) 

### Start the Notification Service

To start the Notification-Service

```shell
cd notification-service
```

Then, launch the Spring Boot application:
- With IntelliJ IDEA or another IDE:  
Open the NotificationServiceApplication.java file (located in src/main/java/com/tbert31/microservices/notification)
Then click on the green ▶️ icon next to the main method or at the top of the file to run the application.

- Or via command line:  
```shell
./mvnw spring-boot:run
```

notification-service is set to run on  : [http://localhost:8083](http://localhost:8083)

To make this service work properly, you need to create an account on [MAILTRAP](https://mailtrap.io/)  
and in the file src/main/resources/application.properties, filled these properties with your mailtrap infos :  
```
#Mail Properties
spring.mail.host=sandbox.smtp.mailtrap.io
spring.mail.port=2525
spring.mail.username=**********
spring.mail.password=**********
```
User Interface on mailtrap.io, where you can find your credentials informations : 
![2025-05-10 13_35_07-Mailtrap - Email Delivery Platform](https://github.com/user-attachments/assets/ef0ff687-960d-4eb3-93b6-a48a9c87e60b)



### Access the Grafana Dashboards
To access the Grafana dashboards, you can access it on : [http://localhost:3000](http://localhost:3000)

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

Then you can access the nextjs-frontend on : [http://localhost:4200](http://localhost:4200)
