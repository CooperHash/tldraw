#!/usr/bin/env bash
set -eux

# a function called 'goodbye' that takes a string as an argument
function goodbye() {
  rm -rf $1
  rm -rf */$1
  rm -rf */*/$1
  rm -rf */*/*/$1
  rm -rf */*/*/*/$1
  rm -rf */*/*/*/*/$1
  rm -rf **/$1
}

rm -rf node_modules
goodbye node_modules
goodbye .turbo
goodbye tmp-assets
goodbye tsconfig.tsbuildinfo
goodbye tsconfig.build.tsbuildinfo
goodbye tsconfig.build.json
goodbye .lazy
goodbye dist-esm
goodbye dist-cjs
goodbye .tsbuild
goodbye .tsbuild-pub
goodbye .tsbuild-dev
goodbye .tsbuild-api

rm -rf packages/*/api
rm -rf {packages,apps}/*/*.tgz

npm i -g corepack
yarn
