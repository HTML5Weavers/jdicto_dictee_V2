#!/bin/bash

if [ -f VERSION ]
then
  version=`cat VERSION`
  major=`echo $version | cut -d. -f1`
  minor=`echo $version | cut -d. -f2`
  revision=`echo $version | cut -d. -f3`
  revision=`expr $revision + 1`

else
  echo "Aucun fichier de version"
  echo "Saisie de la version :"
  read -p "Majeur : " major
  read -p "Mineur : " minor
  read -p "Révision : " revision
fi

echo "$major.$minor.$revision" > VERSION && cat VERSION
echo "{ \"version\":\"$major.$minor.$revision\" }" > ../data/version.json
