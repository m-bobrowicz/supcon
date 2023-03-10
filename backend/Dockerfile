FROM node:18

USER node

RUN mkdir -p /home/node/supcon

WORKDIR /home/node/supcon

COPY --chown=node:node ./package.json ./
COPY --chown=node:node ./package-lock.json ./

RUN npm ci

COPY --chown=node:node ./tsconfig.build.json ./
COPY --chown=node:node ./tsconfig.json ./
COPY --chown=node:node ./nest-cli.json ./
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./dev ./dev

