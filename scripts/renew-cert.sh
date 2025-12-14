#!/bin/bash

docker container rm -f nginx

rm -f ./nginx/ssl/*.backup
mv ./nginx/ssl/solargarlicband.cert ./nginx/ssl/solargarlicband.cert.backup
mv ./nginx/ssl/solargarlicband.key ./nginx/ssl/solargarlicband.key.backup

sudo certbot renew --force-renewal

sudo cp /etc/letsencrypt/live/solargarlicband.com/fullchain.pem ./nginx/ssl/solargarlicband.cert
sudo cp /etc/letsencrypt/live/solargarlicband.com/privkey.pem ./nginx/ssl/solargarlicband.key

sudo chmod 644 ./nginx/ssl/solargarlicband.cert
sudo chmod 644 ./nginx/ssl/solargarlicband.key

./scripts/nginx_build.sh

docker run --rm -d -p 80:80 -p 443:443 --name nginx --network solar-garlic-band solar-garlic-nginx:latest
