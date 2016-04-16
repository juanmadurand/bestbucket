# BestBucket - Chrome Extension

A chrome extension for a better experience reviewing pull request on BitBucket.

## Stack

* Gulp and Webpack build system.
* Crx packaging.
* Live reloading.
* ES6 via Babel.
* Linting via ESLint.

## Installation

* ```npm install -g gulp webpack```
* ```npm install```

## Running

* Run ```gulp```.
* In the Chrome extensions page, click ```Load unpacked extension...``` and select the ```build``` directory.

The extension will automatically reload on code changes.

## Creating a build

* Add your pem as `config/extension.pem`.
* ```gulp build``` will generate a build in ```./dist```.

## License

Copyright (c) 2016 Juanma Durand.

Licensed under the MIT license.
