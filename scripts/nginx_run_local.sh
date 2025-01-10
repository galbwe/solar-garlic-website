#!/bin/bash
docker container rm -f solar-garlic-nginx;
docker run -d -p 8080:80 --name solar-garlic-nginx solar-garlic-nginx:latest;
