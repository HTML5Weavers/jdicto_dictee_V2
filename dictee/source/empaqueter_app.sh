#!/bin/bash
version=`cat VERSION`
echo "Empaquetage de l'application pour la version $version..."
cd ..
chemin=`pwd`
nom=`basename $chemin`
#read -p "Nom du paquet : " nom
zip --suffixes .ogg:.png:.woff2 $nom$version.zip -r .
clear
ls *.zip
sleep 2
mv -fv $nom$version.zip build/$nom$version.nw
echo "Le paquet est disponible dans le dossier 'build'."
echo "Test de l'application..."
cd build
/Applications/nwjs.app/Contents/MacOS/nwjs ./$nom$version.nw &
