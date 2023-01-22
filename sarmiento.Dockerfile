# Stremio Node 14.x
FROM node:latest AS builder
RUN mkdir -p /var/www/stremio-web
WORKDIR /var/www/stremio-web
COPY . /var/www/stremio-web
RUN npm install
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /var/www/stremio-web/build/ ./
EXPOSE 80
