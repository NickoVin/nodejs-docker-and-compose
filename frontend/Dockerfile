# Первый этап: билд приложения
FROM node:16-alpine AS builder

# Указываем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости с помощью npm ci
RUN npm ci

# Копируем весь исходный код в контейнер
COPY . ./

# Собираем приложение
RUN npm run build

# Второй этап: запуск приложения с помощью Nginx
FROM nginx:latest as production

# Указываем рабочую директорию
WORKDIR /app

# Копируем собранное приложение из образа builder в директорию Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем конфигурационный файл Nginx
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d

# Указываем команду для запуска Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]