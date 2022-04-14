#!/bin/bash

service nginx start

go build ./cm/api
./api
