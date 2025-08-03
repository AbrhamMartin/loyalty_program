FROM nginx:1.29-alpine

COPY ./Points/dist /usr/share/nginx/html
COPY ./Points/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]