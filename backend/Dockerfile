FROM node:18

RUN mkdir -p /home/node/supcon

WORKDIR /home/node/supcon

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci

COPY ./tsconfig.build.json ./
COPY ./tsconfig.json ./
COPY ./nest-cli.json ./
COPY ./src ./src
COPY ./dev ./dev

RUN npm run build