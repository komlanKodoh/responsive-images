#!/bin/bash

docker build . -t responsive-images && docker run -e PORT=4000 -p 80:4000 responsive-images