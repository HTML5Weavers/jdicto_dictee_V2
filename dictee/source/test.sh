#!/bin/bash

EXPECTED_ARGS=1
E_BADARGS=999

if [ $# -ne $EXPECTED_ARGS ]
then
  echo "Usage: `basename $0` {-web|-app}"
  echo "Les options sont :"
  echo " -app : pour tester l'application"
  echo " -web : pour tester avec un serveur Web"
  exit $E_BADARGS
fi

if [ $1 = "-app" ]
  then
    echo "Test APP..."
    cd ..
    /Applications/nwjs.app/Contents/MacOS/nwjs . &
elif [ $1 = "-web" ]
  then
    echo "Test Web..."
    cd ..
    echo "Serveur Web..."
    python -m SimpleHTTPServer &
    sleep 3
    echo "Dans le navigateur Chrome..."
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome http://localhost:8000 &

else
  echo "Argument incorrect"
  echo "Les options sont :"
  echo " -app : pour tester l'application"
  echo " -web : pour tester avec un serveur Web"
  exit $E_BADARGS
fi
