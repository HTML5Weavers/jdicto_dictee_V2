#!/bin/bash

E_BUILD_BEFORE=999

# On ne doit pas archiver après une construction
for fic in ../css/*.min.css
do
  if [ -e "$fic" ]; then
    echo "Trouvé une construction : $fic"
    echo "Archivage impossible."
    exit $E_BUILD_BEFORE
  else
    echo "Archivage en cours des fichiers sources..."
    mv -fv ../index.html ./index.html
    mv -fv ../css/app.css ./css/app.css
    mv -fv ../css/fonts.css ./css/fonts.css
    mv -fv ../script/app.js ./script/app.js
    echo "Archivage terminé."
  fi
done
