FROM openjdk:21-jdk-slim
WORKDIR /app
COPY /target/api-gateway-0.0.1-SNAPSHOT.jar /app/api-gateway-0.0.1-SNAPSHOT.jar
EXPOSE 9000
CMD ["java", "-jar", "target/api-gateway-0.0.1-SNAPSHOT.jar"]
