FROM node:current-alpine
WORKDIR /usr/src/view
COPY view/package.json /usr/src/view/
COPY view/yarn.lock /usr/src/view/
COPY view/babel.config.js /usr/src/view/
COPY view/vue.config.js /usr/src/view/
COPY view/src /usr/src/view/src/
COPY view/public/* /usr/src/view/public/
COPY view/public/fonts /usr/src/view/public/fonts/
COPY view/.env /usr/src/view/
COPY view/.env.docker /usr/src/view/
RUN yarn install
RUN yarn build

FROM node:current-alpine

ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/api

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ENV CI 1
COPY api/package.json /usr/src/api/
COPY api/package-lock.json /usr/src/api/
RUN npm ci --only=production
COPY api /usr/src/api
COPY --from=0 /usr/src/view/dist /usr/src/api/public/

EXPOSE 3000
CMD ["/usr/local/bin/npm", "start"]
