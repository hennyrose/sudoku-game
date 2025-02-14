# Використовуємо образ з підтримкою Java 20
FROM eclipse-temurin:20-jdk

# Задаємо PORT як змінну середовища (Render автоматично задає його значення)
ENV PORT=8080

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо JAR-файл проєкту у контейнер
COPY ./target/sudoku-0.0.1-SNAPSHOT.jar /app/sudoku.jar

# Відкриваємо порт 8080
EXPOSE 8080

# Команда для запуску Spring Boot-додатка
CMD ["java", "-jar", "sudoku.jar"]