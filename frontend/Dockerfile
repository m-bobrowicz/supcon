FROM node:18 as builder

USER node

RUN mkdir -p /home/node/supcon

WORKDIR /home/node/supcon

COPY --chown=node:node ./package.json ./
COPY --chown=node:node ./package-lock.json ./

RUN npm ci

COPY --chown=node:node ./tsconfig.app.json ./
COPY --chown=node:node ./tailwind.config.js ./
COPY --chown=node:node ./tsconfig.json ./
COPY --chown=node:node ./angular.json ./
COPY --chown=node:node ./src ./src

RUN npm run build

FROM nginx:1.23.0

COPY --from=builder --chown=nginx:nginx /home/node/supcon/dist /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx
