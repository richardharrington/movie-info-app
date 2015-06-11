#!/bin/bash
rm -rf dist
mkdir -p dist/public/js
mkdir -p dist/public/css
browserify public/js/main.js > dist/public/js/main.js
cp -R public/css/* dist/public/css/.
cp server.js dist/server.js
echo "[]" > dist/data.json
cp public/index.html dist/public/index.html