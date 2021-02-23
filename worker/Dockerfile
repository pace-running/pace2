FROM node:current-alpine

ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/api

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/
COPY package-lock.json /usr/src/
RUN npm ci --only=production
COPY worker.js /usr/src/
COPY mail.js /usr/src/
COPY templates /usr/src/templates/

EXPOSE 3000
CMD ["/usr/local/bin/npm", "start"]
