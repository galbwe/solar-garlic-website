#!/bin/bash

IMAGE_ID=$(docker image ls | grep solar-garlic-next | tr -s ' ' | cut -f2,3 -d ' ' | sort -r | head -n1 | cut -f2 -d ' ')
CONTAINER_NAME=${1:-solar-garlic-next}
PORT=${2:-3000}

docker run -p $PORT:3000 --env-file .env.local -d --name $CONTAINER_NAME --network solar-garlic $IMAGE_ID
