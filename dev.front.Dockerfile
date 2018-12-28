FROM node:8 as base
ARG proxy
ARG npm_registry
# ARG sass_registry
ARG no_proxy

ENV TZ=Europe/Paris
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000

RUN if [ ! -z "$proxy" ] ; then \
        npm config delete proxy; \
        npm config set proxy $proxy; \
        npm config set https-proxy $proxy ; \
        npm config set no-proxy $no_proxy; \
   fi ; \
   [ -z "$npm_registry" ] || npm config set registry=$npm_registry

#
# target developement
#
FROM base as development
ENV NODE_ENV development

COPY client/package.json client/package-lock.json ./
RUN set -ex ; npm install --loglevel verbose

COPY client ./

CMD ["npm", "start"]

#
# target build
#
FROM development as build
ENV NODE_ENV=production
RUN npm run build
#RUN set -ex ; npm run build 2>&1 | tee npm.log ; \
#      egrep -E '(Error|ERR|error)' npm.log && exit 1 ; rm -rf npm.log

#
# target production (build front in prodution mode)
#
FROM base as production
ENV NODE_ENV=production

COPY --from=build /usr/src/app/build ./build

#
# last default  target (nginx+front build)
#
FROM nginx:latest
COPY --from=production /usr/src/app/build/ /usr/share/nginx/html
COPY nginx/run.sh /run.sh
COPY nginx/nginx-run.template /etc/nginx/conf.d/default.template
COPY nginx/nginx.template /etc/nginx/nginx.template
RUN  [ -f "/run.sh" ] && chmod +x /run.sh
CMD ["/run.sh"]
