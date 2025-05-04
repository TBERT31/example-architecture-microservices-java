FROM openjdk:21-jdk-slim
WORKDIR /app
COPY /target/product-service-0.0.1-SNAPSHOT.jar /app/product-service-0.0.1-SNAPSHOT.jar
EXPOSE 8080
CMD ["java", "-jar", "target/product-service-0.0.1-SNAPSHOT.jar"]
