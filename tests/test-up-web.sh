#!/bin/bash
#
# test nginx
#
set -e

basename=$(basename $0)
echo "# $basename ${APP} ${APP_VERSION}"

ret=0
container_name=web

echo "# Test ${APP}-$container_name up"
set +e
timeout=120;
test_result=1
dirname=$(dirname $0)
docker cp $dirname/fake-curl.sh ${APP}_$container_name:/tmp/
until [ "$timeout" -le 0 -o "$test_result" -eq "0" ] ; do
	${DC} -f ${DC_APP_RUN_PROD}  exec ${USE_TTY} $container_name /bin/bash /tmp/fake-curl.sh /candilib/ | grep 'Candilib'
	test_result=$?
	echo "Wait $timeout seconds: ${APP}-$container_name up $test_result";
	(( timeout-- ))
	sleep 1
done
if [ "$test_result" -gt "0" ] ; then
	ret=$test_result
	echo "ERROR: ${APP}-$container_name en erreur"
	exit $ret
fi

exit $ret
