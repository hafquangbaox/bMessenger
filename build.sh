#!/bin/bash

# Clear old build
mkdir -p ./chrome
rm -rf ./chrome/*
rm -rf ./firefox
rm -rf ./opera
mkdir -p ./chrome/src

# Copy new source to chrome
cp -r ./icons ./chrome/
cp -r ./manifest.json ./chrome/
cp -r ./src ./chrome

# Clone source from chrome folder to firefox and opera
cp -r ./chrome ./firefox
cp -r ./chrome ./opera

# Replace storage syn from chrome to storage lcoal on firefox
sed 's/chrome./browser./g' ./chrome/src/background.js > ./firefox/src/_background.js
sed 's/chrome./browser./g' ./chrome/src/content.js > ./firefox/src/_content.js
sed 's/storage.sync./storage.local./g' ./firefox/src/_background.js > ./firefox/src/__background.js
sed 's/storage.sync./storage.local./g' ./firefox/src/_content.js > ./firefox/src/__content.js

# Remove temp file
mv ./firefox/src/__background.js ./firefox/src/background.js
mv ./firefox/src/__content.js ./firefox/src/content.js
rm -rf ./firefox/src/_*

# Merge manifest for firefox
jq -s '.[0] * .[1]' manifest.json manifest-firefox.json > ./firefox/manifest.json

# Merge manifest for opera
jq -s '.[0] * .[1]' manifest.json manifest-opera.json > ./opera/manifest.json

cd chrome && zip -r chrome.zip . -x "*.DS_Store" && cd ..

cd firefox && zip -r firefox.zip . -x "*.DS_Store" && cd ..

cd opera && zip -r opera.zip . -x "*.DS_Store" && cd ..

# Make version by timestamp
# echo $(date +%s) > version.txt

git add .
git commit -am 'Auto commit with build'