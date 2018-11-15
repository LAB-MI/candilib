#!/bin/bash
set -e
[ -z "${APP}" -o -z "${dataset}" -o -z "${ES_HOST}" ] && exit 1
(sed "s/<APP>/${APP}/g;s/<dataset>/${dataset}/g;s/<ES_HOST>/${ES_HOST}/g;" < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf) && nginx -g "daemon off;"
