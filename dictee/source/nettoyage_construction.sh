#!/bin/bash

# On nettoie une construction antérieure
for fic in ../css/*.min.css
do
  if [ -e "$fic" ]; then
    rm -fv $fic
  fi
done

for fic in ../script/*.min.js
do
  if [ -e "$fic" ]; then
    rm -fv $fic
  fi
done
