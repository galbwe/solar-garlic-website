#!/bin/bash

IMAGE_ID=$(docker image ls | grep solar-garlic-next | tr -s ' ' | cut -f2,3 -d ' ' | sort -r | head -n1 | cut -f2 -d ' ');
LAST_COMMIT_SHA=$(git log --oneline | head -n1 | cut -f1 -d ' ');

docker tag $IMAGE_ID 339712990370.dkr.ecr.us-west-1.amazonaws.com/solargarlicband/website:$LAST_COMMIT_SHA; 

docker push 339712990370.dkr.ecr.us-west-1.amazonaws.com/solargarlicband/website:$LAST_COMMIT_SHA; 
