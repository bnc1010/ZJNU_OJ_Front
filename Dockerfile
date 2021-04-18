FROM nginx:1.13.7

ADD ./dist /usr/share/nginx/html

RUN /bin/bash -c  'echo init ok!!!'