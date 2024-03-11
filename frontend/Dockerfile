FROM node:20-alpine AS prod

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:latest

WORKDIR /usr/local/bin
COPY --from=prod /app/dist /usr/share/nginx/html

COPY custom-nginx.template /etc/nginx/conf.d/default.conf

EXPOSE 80
