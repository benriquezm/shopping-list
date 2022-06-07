FROM node:16.15.1 as base

ARG NODE_ENV
ARG PORT
ARG MONGODB_URI

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV MONGODB_URI=$MONGODB_URI

# RUN apk add --update --no-cache 

WORKDIR /shopping-list/

COPY package.json yarn.lock /shopping-list/
RUN yarn install --pure-lockfile --ignore-engines

copy src /shopping-list/src/

EXPOSE $PORT

FROM base as development

CMD yarn dev

FROM base as production

CMD yarn start
