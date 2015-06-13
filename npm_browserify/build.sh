#!/bin/bash
rm -rf dist
mkdir -p dist/public/js
mkdir -p dist/public/css
browserify public/js/index.js > dist/public/js/index.js
cp -R public/css/* dist/public/css/.
cp server.js dist/server.js
echo "[]" > dist/data.json
cp public/index.html dist/public/index.html