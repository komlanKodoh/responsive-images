
FROM ubuntu:20.04

COPY ./api /

ENTRYPOINT ["/api"]