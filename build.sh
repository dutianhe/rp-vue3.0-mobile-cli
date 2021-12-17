#!/bin/bash
git remote show origin

git remote prune origin
echo "--- node version ---"
node -v
echo "--- npm version ---"
npm -v
set -e

#echo "--- install dependencies ---"
npm install
#echo "\n"
#echo "--- clean target folder... ---"
rm -rf target
#echo "\n"
#echo "--- start to build... ---"
  npm run build:release
  npm run build:test
  npm run build:debug

#echo "\n"
#echo "--- build success!!! ---"
