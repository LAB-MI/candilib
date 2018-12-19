#!/bin/bash
#
# configuration nginx
#
set -e
#[ -z "${APP}" -o -z "${dataset}" -o -z "${ES_HOST}" -o -z "${API_USER_BURST}" -o -z "${API_GLOBAL_BURST}" \
#  -o -z "${API_GLOBAL_LIMIT_RATE}" -o -z "${API_USER_LIMIT_RATE}" -o -z "${API_USER_SCOPE}" ] && exit 1
(
 cat /etc/nginx/conf.d/default.template | \
 sed "/^server {/a\
error_log /dev/stderr warn;\
access_log /dev/stdout main;
" > /etc/nginx/conf.d/default.conf
cat /etc/nginx/nginx.template > /etc/nginx/nginx.conf
) && nginx -g "daemon off;"
