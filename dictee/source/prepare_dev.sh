#!/bin/bash
./nettoyage_construction.sh

echo "Préparation de la version de développement..."
./maj_version.sh
cp -fv ./index.html ../index.html
cp -fv ./css/app.css ../css/app.css
cp -fv ./css/fonts.css ../css/fonts.css
cp -fv ./script/app.js ../script/app.js

echo "Exécution de la version Web :"
./test.sh -web
