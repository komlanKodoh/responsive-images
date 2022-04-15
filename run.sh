#!/bin/bash


sed -i 's@$HEROKU_PORT@'"$PORT"'@' /etc/nginx/conf.d/responsive-images.conf

service nginx start

./api
