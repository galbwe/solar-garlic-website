#!/bin/bash


TAG=$1
CONTAINER_NAME=solar-garlic-next

echo logging into ecr ...

ssh -i "~/.ssh/solar-garlic-website.pem" ec2-user@ec2-54-153-32-236.us-west-1.compute.amazonaws.com "
    # log in to docker
    echo logging into docker ...
    aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin 339712990370.dkr.ecr.us-west-1.amazonaws.com

    # pull image from ecr
    echo pulling image ...
    docker image pull 339712990370.dkr.ecr.us-west-1.amazonaws.com/solargarlicband/website:$TAG

    # get image id
    IMAGE_ID="$(docker image ls | grep solargarlicband/website | tr -s ' ' | cut -f2,3 -d ' ' | sort -r | head -n1 | cut -f2 -d ' ')"
    echo IMAGE_ID=$IMAGE_ID

    # stop container running on port
    echo stopping container ...
    docker container rm -f $CONTAINER_NAME

    # start a new container from the current image
    echo starting new container ...
    docker container run -d -p 80:3000 --name $CONTAINER_NAME $IMAGE_ID
"
