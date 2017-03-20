FROM node:7
MAINTAINER Nicolas Law Yim Wan (lawyim_n@etna-alternance.net
RUN mkdir /client
WORKDIR /client
COPY package.json /client
RUN npm install
COPY . /client
CMD ["node", "app.js"]
