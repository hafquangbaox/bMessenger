#!/bin/bash

mkdir -p ./dist
rm -rf ./dist/*
mkdir -p ./dist/src

cp -r ./icons ./dist/
cp -r ./manifest.json ./dist/

#uglifyjs ./src/content.js -c -o ./dist/src/content.js -m --mangle-props reserved=[chrome,storage,sync,get,runtime,onMessage,addListener,turnOn,blur,inline,tabs,query,sendMessage,action,,]
#uglifyjs ./src/background.js -c -o ./dist/src/background.js -m --mangle-props reserved=[chrome,storage,sync,get,runtime,onMessage,addListener,turnOn,blur,inline,tabs,query,sendMessage,action,,]
uglifyjs ./src/content.js -c -o ./dist/src/content.js
uglifyjs ./src/background.js -c -o ./dist/src/background.js
html-minifier-terser --file-ext html --input-dir ./src --output-dir ./dist/src --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace
html-minifier-terser --file-ext css --input-dir ./src --output-dir ./dist/src --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --minify-css true
