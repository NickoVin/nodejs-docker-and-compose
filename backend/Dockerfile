# Первый этап: билд
FROM node:16-alpine AS builder

# Указываем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (потребуются для установки зависимостей)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm i

# Копируем исходный код в контейнер
COPY . ./

# Собираем приложение
RUN npm run build

# Второй этап: запуск
FROM node:16-alpine as production

# Указываем рабочую директорию
WORKDIR /app

# Устанавливаем pm2 глобально
RUN npm install -g pm2

# С помощью параметера --from указываем, что копировать нужно из образа builder
# Копируем package.json и package-lock.json (потребуются для установки зависимостей)
COPY --from=builder /app/package*.json ./

# Устанавливаем только зависимости, необходимые в продакшене
# --omit=dev означает «пропустить dev-зависимости»
RUN npm i --omit=dev \
    && npm i -g pm2

# Копируем директорию со сборкой приложения
COPY --from=builder /app/dist ./dist/

# Копируем конфигурационный файл ecosystem.config.js
COPY ./ecosystem.config.js ./

# Указываем команду для запуска приложения
ENTRYPOINT ["pm2-runtime", "start", "ecosystem.config.js"]