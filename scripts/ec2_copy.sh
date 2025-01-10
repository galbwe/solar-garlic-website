#!/bin/bash
scp -i "~/.ssh/solar-garlic-website.pem" $1 ec2-user@ec2-54-153-32-236.us-west-1.compute.amazonaws.com:/home/ec2-user