#!/bin/bash

docker run -d -p 44470:80 -v $(pwd)/build:/usr/share/nginx/html --name stremio-atv sarmiento/appletv:latest
