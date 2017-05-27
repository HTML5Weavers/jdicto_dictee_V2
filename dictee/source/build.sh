#!/bin/bash

# On archive d'abord les fichiers sources à la racine...
./archivage.sh

echo "---> Nettoyage du dossier de construction..."
rm ../build/css/*.css
rm ../build/script/*.js

echo "Construction..."
echo "---> Minification..."
uglifycss ./css/fonts.css --output ../build/css/fonts.min.css
uglifycss ./css/app.css --output ../build/css/app.min.css
uglifyjs --verbose ./script/app.js -o ../build/script/app.min.js

echo "---> Mise à jour de la version de production"
version=`cat VERSION`
echo "Version : $version"

cp -fv ../build/index.html ../index.html
cp -fv ../build/css/app.min.css ../css/app.min.css
cp -fv ../build/css/fonts.min.css ../css/fonts.min.css
cp -fv ../build/script/app.min.js ../script/app.min.js

echo "Construction achevée."
echo "Pour tester : ./test.sh -app|-web"
