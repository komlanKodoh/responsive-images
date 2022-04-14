
FROM ubuntu/nginx

COPY ./api /
COPY ./run.sh /

RUN apt update

RUN rm /etc/nginx/nginx.config
COPY ./nginx.conf /etc/nginx/sites-enabled/


ENTRYPOINT ["/run.sh"]
