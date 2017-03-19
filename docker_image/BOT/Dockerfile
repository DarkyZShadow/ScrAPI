FROM node:7
MAINTAINER Nicolas Law Yim Wan (lawyim_n@etna-alternance.net
RUN mkdir /bot
RUN apt-get update && apt-get install -y xvfb x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps clang libdbus-1-dev libgtk2.0-dev libnotify-dev libgnome-keyring-dev libgconf2-dev libasound2-dev libcap-dev libcups2-dev libxtst-dev libxss1 libnss3-dev gcc-multilib g++-multilib
WORKDIR /bot
COPY package.json /bot
RUN npm install
COPY . /bot
RUN DEBUG=nightmare xvfb-run --server-args="-screen 0 1024x768x24" npm start
