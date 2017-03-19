FROM node:7
MAINTAINER Nicolas Law Yim Wan (lawyim_n@etna-alternance.net
RUN mkdir /bot
WORKDIR /bot
COPY package.json /api
RUN npm install
COPY . /bot
CMD ["npm", "start"]
