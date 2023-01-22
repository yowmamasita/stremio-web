#!/bin/bash

docker run -d -p 4447:80 -v $(pwd)/build:/usr/share/nginx/html --name stremio-web sarmiento/stremio-web:latest
