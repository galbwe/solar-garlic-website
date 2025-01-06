#!/bin/bash

IMAGE_ID=$(docker image ls | grep solar-garlic-next | tr -s ' ' | cut -f2,3 -d ' ' | sort -r | head -n1 | cut -f2 -d ' ')

docker run -p 3000:3000 $IMAGE_ID
