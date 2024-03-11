#FROM nginx:latest
FROM openresty/openresty:1.19.9.1-5-alpine-fat
RUN luarocks install luajson

#remove the original default configuration file
RUN rm -rf /etc/nginx/conf.d/default.conf

#copy the root nginx conf file
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

#copy the backends file
COPY ./servers.conf /etc/nginx/servers.conf

#copy the V3 API file
COPY ./api_conf.d /etc/nginx/api_conf.d

#Copy error file
COPY ./json_errors.conf /etc/nginx/json_errors.conf

COPY html /usr/share/nginx/html

COPY lua /usr/local/openresty/nginx/lua