
FROM ubuntu/nginx

RUN cd  /etc/nginx/sites-enabled/ && rm default
RUN rm  /etc/nginx/sites-available/default

# RUN useradd -ms /bin/bash ROOT
# USER ROOT
# WORKDIR /home/ROOT

COPY ./api /
COPY ./run.sh /
COPY ./static/pages /static/pages

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./responsive-images.conf /etc/nginx/conf.d/


# ENTRYPOINT [ "/run.sh" ]
CMD /run.sh
