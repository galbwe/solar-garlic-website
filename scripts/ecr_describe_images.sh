#!/bin/bash

aws ecr describe-images \
    --region us-west-1 \
    --registry-id 339712990370 \
    --repository-name solargarlicband/website