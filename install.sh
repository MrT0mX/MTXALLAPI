#!/usr/bin/bash

git config --global user.email "mrtomxxxx5@gmail.com"
git config --global user.name "MrTomXxX"
git init
git add *
git commit -m "new update"
git branch -M master
git remote add origin https://github.com/MrT0mX/MTXALLAPI.git
git push -u origin master