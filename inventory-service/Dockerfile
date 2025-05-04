FROM openjdk:21-jdk-slim
WORKDIR /app
COPY /target/inventory-service-0.0.1-SNAPSHOT.jar /app/inventory-service-0.0.1-SNAPSHOT.jar
EXPOSE 8082
CMD ["java", "-jar", "target/inventory-service-0.0.1-SNAPSHOT.jar"]
