FROM node:7
MAINTAINER Nicolas Law Yim Wan (lawyim_n@etna-alternance.net
RUN mkdir /api
WORKDIR /api
COPY package.json /api
RUN npm install
COPY . /api
CMD ["npm", "start"]
