FROM openjdk:21-jdk-slim
WORKDIR /app
COPY /target/order-service-0.0.1-SNAPSHOT.jar /app/order-service-0.0.1-SNAPSHOT.jar
EXPOSE 8081
CMD ["java", "-jar", "target/order-service-0.0.1-SNAPSHOT.jar"]
