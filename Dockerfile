FROM nginx

WORKDIR /app

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist /usr/share/nginx/html

EXPOSE 443/tcp 80/tcp


# docker run -p 8080:80 cr.yandex/crpgchanq5ana2um4jph/pomodoro:v1
