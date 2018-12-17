FROM node:8 as base
ARG proxy
ARG npm_registry
# ARG sass_registry
ARG no_proxy

ENV TZ=Europe/Paris
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8000

RUN if [ ! -z "$proxy" ] ; then \
        npm config delete proxy; \
        npm config set proxy $proxy; \
        npm config set https-proxy $proxy ; \
        npm config set no-proxy $no_proxy; \
   fi ; \
   [ -z "$npm_registry" ] || npm config set registry=$npm_registry ; \
    npm install pm2 -g

#RUN npm install pm2 -g

FROM base as development
ENV NODE_ENV development
COPY package.json package-lock.json ./
RUN if [ ! -z "$proxy" ] ; then \
        npm config delete proxy; \
        npm config set proxy $proxy; \
        npm config set https-proxy $proxy ; \
        npm config set no-proxy $no_proxy; \
   fi ; \
   [ -z "$npm_registry" ] || npm config set registry=$npm_registry ; \
    npm install

COPY .env .eslintignore .eslintrc server/inbox/sites.json .babelrc index.js nodemon.json webpack.config.babel.js webpack.config.prod.js webpack.config.server.js ./
COPY client ./client
COPY server ./server
CMD ["npm", "start"]

FROM development as build
ENV NODE_ENV=production
RUN npm run build

FROM base as production
ENV NODE_ENV=production
COPY package.json package-lock.json processes.json ./
RUN if [ ! -z "$proxy" ] ; then \
        npm config delete proxy; \
        npm config set proxy $proxy; \
        npm config set https-proxy $proxy ; \
   fi ; \
   [ -z "$npm_registry" ] || npm config set registry=$npm_registry ; \
    npm install --production
COPY index.js .env ./
COPY --from=build /usr/src/app/dist ./dist
CMD ["pm2-runtime", "processes.json"]
