#!/bin/bash

# configure aws cli usage
AWS_PROFILE=$(cat ~/.aws/credentials | head -n1) 
AWS_ACCESS_KEY_ID=$(cat ~/.aws/credentials | grep aws_access_key_id | tr -s ' ' | cut -f2 -d '=')
AWS_SECRET_ACCESS_KEY_ID=$(cat ~/.aws/credentials | grep aws_secret_access_key | tr -s ' ' | cut -f2 -d '=')


ssh -i "~/.ssh/solar-garlic-website.pem" ec2-user@ec2-54-153-32-236.us-west-1.compute.amazonaws.com "

    echo updating packages ...
    sudo yum update -y;

    echo installing vim ...
    sudo yum install -y vim;

    echo installing docker ...
    sudo yum install -y docker;

    echo starting docker ...
    sudo service docker start;

    echo allowing user to execute docker ...
    sudo usermod -aG docker ec2-user;

    echo enabling docker start on system boot ...
    sudo chkconfig docker on;
"
