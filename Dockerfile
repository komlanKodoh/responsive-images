
FROM ubuntu/nginx

COPY ./api /
COPY ./run.sh /

RUN apt update
RUN cd  /etc/nginx/sites-enabled/ && rm default

COPY ./nginx.conf /etc/nginx/sites-enabled/

COPY ./static /static


ENTRYPOINT ["/run.sh"]
